import React, { useState } from 'react';
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Form, Input, Table, Typography } from 'antd';
import PropTypes from 'prop-types';
import useSelectorTypeSituation from '../../hooks/selectors/useSelectorTypeSituation';

/*import Highlighter from 'react-highlight-words';*/

// eslint-disable-next-line react/display-name
const TableTypeSituation = React.memo(({ datasource = [] }) => {
	const { updateTypeSituationID } = useSelectorTypeSituation();
	const [editingKey, setEditingKey] = useState('');
	const [form] = Form.useForm();

	const isEditing = (record) => record.tisiId === editingKey;

	const edit = (record) => {
		form.setFieldsValue({ ...record });
		setEditingKey(record.tisiId);
	};

	const cancel = () => {
		setEditingKey('');
	};

	const save = async (tisiId) => {
		try {
			const row = await form.validateFields();
			const newData = [...datasource];
			const index = newData.findIndex((item) => tisiId === item.tisiId);

			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, { ...item, ...row });				
				updateTypeSituationID({ id: tisiId, tisiNombre: row.tisiNombre });
				setEditingKey('');
			}
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo);
		}
	};

	const columns = [
		{
			title: 'ID',
			dataIndex: 'tisiId',
			key: 'tisiId',
			width: '25%',
		},
		{
			title: 'Nombre',
			dataIndex: 'tisiNombre',
			key: 'tisiNombre',
			width: '50%',
			editable: true,
		},
		{
			title: 'Acción',
			dataIndex: 'address',
			key: 'address',
			width: '25%',
			render: (_, record) => {
				
				const editable = isEditing(record);
				return editable ? (
					<span>
						<Typography.Link onClick={() => save(record.tisiId)} style={{ marginRight: 8 }}>
							<SaveOutlined /> Guardar
						</Typography.Link>
						<Typography.Link onClick={cancel}>Cancelar</Typography.Link>
					</span>
				) : (
					<span style={{display:'flex', justifyContent:'space-evenly'}} >
						<Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
							<EditOutlined /> Editar
						</Typography.Link>

						<Typography.Link>
							<DeleteOutlined /> Eliminar
						</Typography.Link>
					</span>
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
				editable: col.editable,
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});

	const EditableCell = ({ editing, dataIndex, title, record, index, children, ...restProps }) => {
		return (
			<td {...restProps}>
				{editing ? (
					<Form.Item
						name={dataIndex}
						style={{ margin: 0 }}
						rules={[{ required: true, message: `${title} es requerido.` }]}
					>
						<Input />
					</Form.Item>
				) : (
					children
				)}
			</td>
		);
	};

	return (
		<>
			<Form form={form} component={false}>
				<Table
					components={{
						body: {
							cell: EditableCell,
						},
					}}
					bordered
					dataSource={datasource.map((item) => ({
						...item,
						key: item.tisiId,
					}))}
					columns={mergedColumns}
					rowClassName='editable-row'
					pagination={false}
				/>
			</Form>
		</>
	);
});

TableTypeSituation.propTypes = {
	datasource: PropTypes.array.isRequired,
};

export default TableTypeSituation;
