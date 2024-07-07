import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Table, Typography } from 'antd';
import PropTypes from 'prop-types';
import useSelectorTypeSituation from '../../hooks/selectors/useSelectorTypeSituation';

/*import Highlighter from 'react-highlight-words';*/

// eslint-disable-next-line react/display-name
const TableTypeSituation = React.memo(({ datasource = [] }) => {
	const [rowClick, setRowClick] = useState([{}]);
	const { updateTypeSituationID } = useSelectorTypeSituation();

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
								onClick={() => handleEdit(record)}
								style={{
									marginRight: 8,
								}}
							>
								<EditOutlined /> Editar
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
		console.log(record);
		const selectedRow = datasource.filter((item) => {
			return item.plmeId === record.plmeId;
		});

		const indexSelectedRow = datasource.findIndex((item) => item.plmeId === record.plmeId);
		setRowClick([...selectedRow, indexSelectedRow]);

		// updateTypeSituationID({ id: record.tisiId });
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
