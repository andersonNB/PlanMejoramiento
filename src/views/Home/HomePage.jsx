import { useState } from 'react';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import ContentHomePage from '../ContentHome/ContentHomePage';
import router from '../../routes/routes';

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

	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const onChangeItem = (e) => {
		console.log(e);
		setItemRoutes(e?.item);
	};

  
  console.log(router.routes.filter(child => child.path === itemRoutes?.props.path))

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
				/>
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
								? router.routes.filter(child => child.path === itemRoutes?.props.path)[0]?.element || 'No hay contenido'
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
