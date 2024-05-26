import React, { useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import PropTypes from 'prop-types';
import useSelectorProgramAcademic from '../../hooks/selectors/useSelectorProgramAcademic';

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
	const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{
						margin: 0,
					}}
					rules={[
						{
							required: true,
							message: `Please Input ${title}!`,
						},
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
	const isEditing = (record) => record.pracId === editingKey;
	const { updateAcademicProgram } = useSelectorProgramAcademic();

	const edit = (record) => {
		console.log({ record });
		// console.log(form)
		form.setFieldsValue({
			...record,
		});
		setEditingKey(record.pracId);
	};

	const cancel = () => {
		setEditingKey('');
	};

	const save = async (key) => {
		// 1. Cuando le de click en Save llamar al servicio de actualizar
		// 2. Actualizar el estado de la tabla

		try {
			const row = await form.validateFields();
			const newData = [...datasource];
			const index = newData.findIndex((item) => key === item.pracId);
			console.log(index);
			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, {
					...item,
					...row,
				});
				console.log({ newData });
				updateAcademicProgram(
					newData[index]?.pracId,
					{
						pracNombre: newData[index].pracNombre,
						pracCodigo: newData[index].pracCodigo,
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
			title: 'Nombre Programa',
			dataIndex: 'pracNombre',
			width: '25%',
			editable: true,
		},
		{
			title: 'Codigo',
			dataIndex: 'pracCodigo',
			width: '15%',
			editable: true,
		},
		{
			title: 'Operación',
			dataIndex: 'operation',
			render: (_, record) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						<Typography.Link
							onClick={() => save(record.pracId)}
							style={{
								marginRight: 8,
							}}
						>
							Guardar
						</Typography.Link>
						<Popconfirm title='Sure to cancel?' onConfirm={cancel}>
							<a>Cancelar</a>
						</Popconfirm>
					</span>
				) : (
					<Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
						Editar
					</Typography.Link>
				);
			},
		},
	];
	const mergedColumns = columns.map((col) => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: (record) => ({
				record,
				inputType: col.dataIndex === 'pracCodigo' ? 'number' : 'text',
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});
	// console.log({mergedColumns})
	return (
		<Form form={form} component={false}>
			<Table
				components={{
					body: {
						cell: EditableCell,
					},
				}}
				bordered
				dataSource={datasource}
				columns={mergedColumns}
				rowClassName='editable-row'
				pagination={{
					onChange: cancel,
				}}
			/>
		</Form>
	);
});

TableDinamic.displayName = 'TableDinamic';

TableDinamic.propTypes = {
	datasource: PropTypes.array.isRequired,
};

export default TableDinamic;
