import React, { useRef, useState } from 'react';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Button, Table, Space, Typography, Popconfirm, Modal, Row, Col, Form, Select } from 'antd';
import PropTypes from 'prop-types';
import useSelectorImprovementPlan from '../../hooks/selectors/useSelectorImprovementPlan';
/*import Highlighter from 'react-highlight-words';*/

// eslint-disable-next-line react/display-name
const TableImprovementPlan = React.memo(({ datasource = [], academicPrograms = [] }) => {
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();
	const [rowClick, setRowClick] = useState({});
	const { updateImprovementPlan } = useSelectorImprovementPlan();

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
			render: (text, record, index) => {
				const editable = true;
				// const editable = isEditing(record);
				return (
					editable && (
						<span>
							<Typography.Link
								onClick={() => setIsModalOpen(true)}
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

	const onSubmitUpdate = (values) => {
		console.log(values);
	};

	const handleEdit = (record) => {
		// e.stopPropagation();

		console.log({ record, datasource });

		const selectedRow = datasource.filter((item) => {
			return item.plmeId === record.plmeId;
		});
		form.setFieldsValue({
			plmeNombre: selectedRow.plmeNombre,
			pracId: selectedRow.programaAcademico?.pracId,
		});
		console.log(selectedRow);
		setIsModalOpen(true);
		setRowClick(selectedRow);
	};

	return (
		<>
			<Table
				columns={columns}
				dataSource={datasource.map((item) => ({
					...item,
					key: item.plmeId,
				}))}
				onRow={(record, index) => {
					return {
						onClick: () => handleEdit(record),
					};
				}}
			/>
			{isModalOpen && (
				<Modal title='Editar Plan de Mejoramiento' open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
					<Row style={{ backgroundColor: '#fafafa', borderRadius: '10px' }} justify='center'>
						<Col xs={12} sm={12} md={24} lg={24}>
							<Form
								form={form}
								name='formLogin'
								layout='horizontal'
								onFinish={onSubmitUpdate}
								labelCol={{ span: 8 }}								
							>
								<Form.Item
									label='Nombre'
									name='plmeNombre'
									rules={[
										{
											required: true,
											message: 'Digite un nombre para el plan de mejoramiento',
										},
									]}									
								>
									<Input
										placeholder='nombre plan de mejoramiento'										
									/>
								</Form.Item>

								<Form.Item
									label='Programa Academico'
									name='pracId'
									rules={[
										{
											required: true,
											message: 'Por favor, escoja un programa académico',
										},
									]}									
								>
									<Select
										placeholder='Programa Academico'										
									>
										{academicPrograms?.length > 0 &&
											academicPrograms.map((program, index) => {
												return (
													<Select.Option key={index} value={program?.pracId}>
														{program?.pracNombre}
													</Select.Option>
												);
											})}
									</Select>
								</Form.Item>

								<Form.Item
									wrapperCol={{
										md: { span: 12, offset: 6 },
									}}
									style={{ textAlign: 'center' }}
								>
									<Button
										type='primary'
										htmlType='submit'
										style={{ backgroundColor: '#D73925', color: 'white' }}
									>
										Editar Plan
									</Button>
								</Form.Item>
							</Form>
						</Col>
					</Row>
				</Modal>
			)}
		</>
	);
});

TableImprovementPlan.propTypes = {
	datasource: PropTypes.array.isRequired,
	academicPrograms: PropTypes.array.isRequired,
};

export default TableImprovementPlan;
