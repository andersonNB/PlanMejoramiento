import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DesktopOutlined, FileOutlined, PieChartOutlined, PoweroffOutlined, TeamOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Typography, theme } from 'antd';
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
		path,
	};
}
const items = [
	getItem('INFORMACIÓN PREDETERMINADA', '1', <PieChartOutlined />, [
		getItem('Programa Academico', '3', <FileOutlined />, null, '/programa-academico'),
		getItem('Factor', '4'),
		getItem('Linea Estrategica', '5'),
		getItem('Programa Inversión', '7'),
	]),
	getItem('PLAN DE MEJORAMIENTO', '2', <DesktopOutlined />),
	getItem('PROYECTOS', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
	// getItem('Files', '9', <FileOutlined />),
];
const HomePage = () => {
	const [collapsed, setCollapsed] = useState(false);
	const [itemRoutes, setItemRoutes] = useState();
	const { logged, logout } = useContext(AuthContext);
	console.log({logged})
	const navigate = useNavigate();
	
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
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const onChangeItem = (e) => {
		console.log(e);
		setItemRoutes(e?.item);
	};

	const onLogout = () => {
		logout();
		navigate('/', { replace: true });
	};

	return (
		<Layout
			style={{
				minHeight: '100vh',
			}}
		>
			<Sider theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={310}>
				<div className='demo-logo-vertical' />
				<Menu theme='light' defaultSelectedKeys={['1']} mode='inline' items={items} onSelect={onChangeItem} />
			</Sider>
			<Layout style={{ backgroundColor: 'gray' }}>
				<Header
					style={{
						padding: 0,
						background: '#DD4B39',
					}}
				>
					<Typography
						onClick={onLogout}
						style={{ textAlign: 'right', paddingTop: 10, paddingRight: 10, color: 'white', cursor: 'pointer' }}
					>
						{' '}
						<PoweroffOutlined /> Cerrar Sesión
					</Typography>
				</Header>
				<Content
					style={{
						height: '100vh',
					}}
				>
					<Breadcrumb
						style={{
							margin: '16px 0',
						}}
						items={[{ title: 'User' }, { title: 'Bill' }, { title: 'Bill' }]}
					/>
					<div
						style={{
							padding: 24,
							minHeight: '100%',
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
							color: 'red',
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
						textAlign: 'center',
					}}
				>
					Ant Design ©{new Date().getFullYear()} Created by UFPS
				</Footer>
			</Layout>
		</Layout>
	);
};
export default HomePage;
