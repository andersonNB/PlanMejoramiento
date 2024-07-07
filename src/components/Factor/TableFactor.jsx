import React, { useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import PropTypes from 'prop-types';
import useSelectorFactor from '../../hooks/selectors/useSelectorFactor.js';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
	const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{
						margin: 0
					}}
					rules={[
						{
							required: true,
							message: `Please Input ${title}!`
						}
					]}
				>
					{inputNode}
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};

const TableDinamic = React.memo(({ datasource = [] }) => {
	const [form] = Form.useForm();
	const [editingKey, setEditingKey] = useState('');
	const isEditing = (record) => record.factId === editingKey;
	const { updateFactor } = useSelectorFactor();

	const edit = (record) => {
		console.log('MEtodo Update', record)
		;
		// console.log(form)
		form.setFieldsValue({
			...record
		});
		setEditingKey(record.factId);
	};

	const cancel = () => {
		setEditingKey('');
	};

	const save = async (key) => {

		try {
			const row = await form.validateFields();
			const newData = [...datasource];
			const index = newData.findIndex((item) => key === item?.factId);
			console.log(index);
			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, {
					...item,
					...row
				});
				console.log('metodo save ', newData);
				updateFactor(
					newData[index]?.factId,
					{
						factNombre: newData[index].factNombre,
						tifaId: newData[index].tifaId
					},
					index
				);
				// setDatasource(newData);

				setEditingKey('');
			} else {
				newData.push(row);
				// setDatasource(newData);
				setEditingKey('');
			}
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo);
		}
	};

	const columns = [
		{
			title: 'Nombre Factor',
			dataIndex: 'factNombre',
			width: '25%',
			editable: true
		},
		{
			title: 'tipo Factor',
			dataIndex: ['tipoFactor', 'tifaNombre'],
			width: '15%',
			editable: true
		},
		{
			title: 'Operación',
			dataIndex: 'operation',
			render: (_, record) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						<Typography.Link
							onClick={() => save(record.factId)}
							style={{
								marginRight: 8
							}}
						>
							Guardar
						</Typography.Link>
						<Popconfirm title="Deseas cancelar?" onConfirm={cancel} okText=" Si">
							<a>Cancelar</a>
						</Popconfirm>
					</span>
				) : (
					<>
						<Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}
								     style={{ margin: 15 }}>
							<EditOutlined /> Editar
						</Typography.Link>
					</>
				);
			}
		}
	];
	const mergedColumns = columns.map((col) => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: (record, rowIndex) => ({
				record,
				inputType: 'text',
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
				key: `${record.factId}-${col.dataIndex}`
			})
		};
	});
	// console.log({mergedColumns})
	return (
		<Form form={form} component={false}>
			<Table
				components={{
					body: {
						cell: EditableCell
					}
				}}
				bordered
				dataSource={datasource.map(item => ({
					...item,
					key: item.factId
				}))} // Clave única para cada fila
				columns={mergedColumns}
				rowClassName="editable-row"
				pagination={{
					onChange: cancel
				}}
			/>
		</Form>
	);
});

TableDinamic.displayName = 'TableDinamic';

TableDinamic.propTypes = {
	datasource: PropTypes.array.isRequired
};

export default TableDinamic;
