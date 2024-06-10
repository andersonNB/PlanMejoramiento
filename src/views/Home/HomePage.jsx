import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	DesktopOutlined,
	FileOutlined,
	PieChartOutlined,
	PoweroffOutlined,
	TeamOutlined,
	BookOutlined,
	GatewayOutlined,
	ProductOutlined,
	PartitionOutlined,
	ProjectOutlined,
	BlockOutlined,
	FileProtectOutlined
} from '@ant-design/icons';
import { Layout, Menu, Typography, theme, Avatar, Row } from 'antd';
import ContentHomePage from '../ContentHome/ContentHomePage';
import router from '../../routes/routes';
import AuthContext from '../../context/auth/AuthContext';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon = <FileOutlined />, children, path) {
	return {
		key,
		icon,
		children,
		label,
		path
	};
}

//TODO: este menu debe venir de bk
const items = [
	getItem('INFORMACIÓN PREDETERMINADA', '1', <PieChartOutlined />, [
		getItem('Programa Academico', '3', <BookOutlined />, null, '/programa-academico'),
		getItem('Factor', '4', <GatewayOutlined />, null, '/factor'),
		getItem('Ejes Estrategicos', '5', <ProductOutlined />, null, '/eje-estrategico'),
		getItem('Lineas Estrategicas', '6', <PartitionOutlined />, null, '/linea-estrategica'),
		getItem('Programas Inversión', '7', <ProjectOutlined />, null, '/programa-inversion'),
		getItem('Procesos', '8', <BlockOutlined />, null, '/proceso'),
		getItem('Tipo situacion', '9', <FileProtectOutlined />, null, '/tipo-situacion')
	]),
	getItem('PLAN DE MEJORAMIENTO', '2', <DesktopOutlined />, null, '/plan-mejoramiento'),
	getItem('PROYECTOS', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')])
	// getItem('Files', '9', <FileOutlined />),
];
const HomePage = () => {
	const [collapsed, setCollapsed] = useState(false);
	const [itemRoutes, setItemRoutes] = useState();
	const { logged, logout, user, isAdmin } = useContext(AuthContext);
	console.log(isAdmin);
	const { usuario } = user;
	const navigate = useNavigate();

	console.log('|||| desde home ', user);
	useEffect(() => {
		const handleBeforeUnload = (event) => {
			event.preventDefault();
			event.returnValue = ''; // Chrome requires returnValue to be set
		};

		const handlePopState = (event) => {
			navigate('/dashboard', { replace: true });
		};

		window.addEventListener('beforeunload', handleBeforeUnload);
		window.history.pushState(null, document.title, window.location.href);
		window.addEventListener('popstate', handlePopState);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
			window.removeEventListener('popstate', handlePopState);
		};
	}, [navigate]);

	const {
		token: { colorBgContainer, borderRadiusLG }
	} = theme.useToken();

	const onChangeItem = (e) => {
		setItemRoutes(e?.item);
	};

	const onLogout = () => {
		localStorage.clear();
		logout();
		const route = isAdmin ? '/login-admin' : '/login';
		navigate({ route }, { replace: true });
	};

	console.log({ user });
	return (
		<Layout
			style={{
				minHeight: '100vh'
			}}
		>
			<Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
				 width={310}>
				<div className="demo-logo-vertical" />
				<Row style={{ width: '100%', paddingTop: '5%' }} justify="center">
					<Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
						  src={usuario?.usuaFoto ? usuario?.usuaFoto : 'https://ingsistemas.cloud.ufps.edu.co/rsc/img/logo_ingsistemas_vertical_invertido.png'} />
				</Row>
				<Row style={{ width: '100%' }} justify="center">
					<h4 style={{ color: 'black' }}>{usuario?.usuaNombre || 'nombre Admin'}</h4>
				</Row>

				<Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items}
					onSelect={onChangeItem} />
			</Sider>
			<Layout style={{ backgroundColor: 'gray' }}>
				<Header
					style={{
						padding: 0,
						background: '#DD4B39',
						display: 'flex',
						justifyContent: 'flex-end'
					}}
				>
					<Typography
						onClick={onLogout}
						style={{
							paddingTop: 10,
							paddingRight: 10,
							color: 'white',
							cursor: 'pointer',
							width: '114px'
						}}
					>
						{' '}
						<PoweroffOutlined /> Cerrar Sesión
					</Typography>
				</Header>
				<Content
					style={{
						height: '100vh'
					}}
				>
					<div
						style={{
							padding: 24,
							minHeight: '100%',
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
							color: 'red'
						}}
					>
						<ContentHomePage>
							{router.routes.length > 0
								? router.routes.filter((child) => child.path === itemRoutes?.props.path)[0]?.element ||
								'No hay contenido'
								: 'No hay contenido'}
						</ContentHomePage>
					</div>
				</Content>
				<Footer
					style={{
						textAlign: 'center'
					}}
				>
					Ant Design ©{new Date().getFullYear()} Created by UFPS
				</Footer>
			</Layout>
		</Layout>
	);
};
export default React.memo(HomePage);
