import React, { useRef, useState } from 'react';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Button, Table, Space, Typography, Popconfirm, Modal } from 'antd';
import PropTypes from 'prop-types';
/*import Highlighter from 'react-highlight-words';*/

// eslint-disable-next-line react/display-name
const TableImprovementPlan = React.memo(({ datasource = [] }) => {
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};
	const handleReset = (clearFilters) => {
		clearFilters();
		setSearchText('');
	};

	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
			<div
				style={{
					padding: 8,
				}}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{
						marginBottom: 8,
						display: 'block',
					}}
				/>
				<Space>
					<Button
						type='primary'
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size='small'
						style={{
							width: 90,
						}}
					>
						Search
					</Button>
					<Button
						onClick={() => clearFilters && handleReset(clearFilters)}
						size='small'
						style={{
							width: 90,
						}}
					>
						Reset
					</Button>
					<Button
						type='link'
						size='small'
						onClick={() => {
							confirm({
								closeDropdown: false,
							});
							setSearchText(selectedKeys[0]);
							setSearchedColumn(dataIndex);
						}}
					>
						Filter
					</Button>
					<Button
						type='link'
						size='small'
						onClick={() => {
							close();
						}}
					>
						close
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined
				style={{
					color: filtered ? '#1677ff' : undefined,
				}}
			/>
		),
		onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{
						backgroundColor: '#ffc069',
						padding: 0,
					}}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			),
	});

	const columns = [
		{
			title: 'Nombre',
			dataIndex: 'plmeNombre',
			key: 'plmeNombre',
			width: '30%',
			...getColumnSearchProps('plmeNombre'),
		},
		{
			title: 'Programa Academico',
			dataIndex: ['programaAcademico', 'pracNombre'],
			key: ['programaAcademico', 'pracNombre'],
			width: '30%',
			...getColumnSearchProps('pracNombre'),
		},
		{
			title: 'Acción',
			dataIndex: 'address',
			key: 'address',
			...getColumnSearchProps('address'),
			sorter: (a, b) => a.address.length - b.address.length,
			sortDirections: ['descend', 'ascend'],
			render: (_, record) => {
				const editable = true;
				// const editable = isEditing(record);
				return editable ? (
					<span>
						<Typography.Link
							onClick={() => setIsModalOpen(true)}
							style={{
								marginRight: 8,
							}}
						>
							Guardar
						</Typography.Link>
						<Popconfirm title='Deseas cancelar?' onConfirm={() => console.log('cancelar')} okText=' Si'>
							<a>Cancelar</a>
						</Popconfirm>
					</span>
				) : (
					<>
						<Typography.Link
							/*disabled={editingKey !== ''}*/ onClick={() => console.log('edit')}
							style={{ margin: 15 }}
						>
							<EditOutlined /> Editar
						</Typography.Link>
						<Typography.Link /*disabled={editingKey !== ''}*/ onClick={() => console.log('deleteProgram')}>
							<DeleteOutlined /> Eliminar
						</Typography.Link>
					</>
				);
			},
		},
	];

	return (
		<>
			<Table
				columns={columns}
				dataSource={datasource.map((item) => ({
					...item,
					key: item.plmeId,
				}))}
			/>
			{isModalOpen && (
				<Modal
					title='Basic Modal'
					open={isModalOpen}
					onOk={() => setIsModalOpen(false)}
					onCancel={() => setIsModalOpen(false)}
				>
					<p>Some contents...</p>
					<p>Some contents...</p>
					<p>Some contents...</p>
				</Modal>
			)}
		</>
	);
});

TableImprovementPlan.propTypes = {
	datasource: PropTypes.array.isRequired,
};

export default TableImprovementPlan;
