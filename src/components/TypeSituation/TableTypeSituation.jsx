import React, { useState } from 'react';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import {  Table, Typography, Form } from 'antd';
import PropTypes from 'prop-types';
import useSelectorImprovementPlan from '../../hooks/selectors/useSelectorImprovementPlan';
/*import Highlighter from 'react-highlight-words';*/

// eslint-disable-next-line react/display-name
const TableTypeSituation = React.memo(({ datasource = [] }) => {
	
	const [form] = Form.useForm();
	const [rowClick, setRowClick] = useState([{}]);
	const { updateImprovementPlan } = useSelectorImprovementPlan();


	const columns = [
        {
            title: 'ID',
            dataIndex:'tisiId',
            key:'tisiId',
            width: '25%',
        },
		{
			title: 'Nombre',
			dataIndex: 'tisiNombre',
			key: 'tisiNombre',
			width: '50%',
		},
		{
			title: 'Acción',
			dataIndex: 'address',
			key: 'address',
            width: '25%',
			render: (text, record, index) => {
				const editable = true;
				// const editable = isEditing(record);
				return (
					editable && (
						<span>
							<Typography.Link
								onClick={() => console.log('clic')}
								style={{
									marginRight: 8,
								}}
							>
								Editar
							</Typography.Link>
						</span>
					)
				);
			},
		},
	];

	// const onSubmitUpdate = (values) => {
	// 	console.log(rowClick)
	// };

	const handleEdit = (record) => {
		// e.stopPropagation();
		const selectedRow = datasource.filter((item) => {
			return item.plmeId === record.plmeId;
		});

		const indexSelectedRow = datasource.findIndex((item) => item.plmeId === record.plmeId);
		form.setFieldsValue({
			plmeNombre: selectedRow.plmeNombre,
			pracId: selectedRow.programaAcademico?.pracId,
		});
		setIsModalOpen(true);
		setRowClick([...selectedRow, indexSelectedRow]);
	};

	return (
		<>
			<Table
				columns={columns}
				dataSource={datasource.map((item) => ({
					...item,
					key: item.tisiId,
				}))}
				onRow={(record, index) => {
					return {
						onClick: () => handleEdit(record),
					};
				}}
			/>
		</>
	);
});

TableTypeSituation.propTypes = {
	datasource: PropTypes.array.isRequired,
};

export default TableTypeSituation;
