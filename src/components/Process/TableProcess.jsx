import React, { useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import PropTypes from 'prop-types';
import useSelectorProcess from '../../hooks/selectors/useSelectorProcess.js';
import { EditOutlined } from '@ant-design/icons';

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
	const isEditing = (record) => record.procId === editingKey;
	const { updateProcess } = useSelectorProcess();

	const edit = (record) => {
		// console.log(form)
		form.setFieldsValue({
			...record
		});
		setEditingKey(record.procId);
	};

	const cancel = () => {
		setEditingKey('');
	};

	const save = async (key) => {

		try {
			const row = await form.validateFields();
			const newData = [...datasource];
			const index = newData.findIndex((item) => key === item?.procId);

			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, {
					...item,
					...row
				});
				console.log('metodo save ', newData);
				updateProcess(
					newData[index]?.procId,
					{
						procNombre: newData[index].procNombre
					},
					index
				);

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
			title: 'Proceso',
			dataIndex: 'procNombre',
			width: '50%',
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
							onClick={() => save(record.procId)}
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
				key: `${record.procId}-${col.dataIndex}`
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
					key: item.procId
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
