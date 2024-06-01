import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Input, Button, Select } from 'antd';
import { GoogleLogin } from '@react-oauth/google';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useSelectorLogin from '../../../hooks/selectors/useSelectorLogin';
import AuthContext from '../../../context/auth/AuthContext';

const ColUser = styled(Col)`
	background-color: salmon;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 15px;
	// height: 15vh;
`;

const InputItem = styled(Input)`
	border: 1.5px solid #e7e7e9;
	height: 56px;
	width: 100%;
`;
const InputItemPassword = styled(Input.Password)`
	border: 1.5px solid #e7e7e9;
	height: 56px;
	width: 100%;
`;

const ButtonItem = styled(Button)`
	width: 100%;
	border-radius: 20px;
	height: 46px;
`;

const LoginPage = ({ isAdmin }) => {

	const {signIn} = useSelectorLogin();
	const [form] = Form.useForm();
	const {login} = useContext(AuthContext);

	// console.log('login',login)
	const history = useNavigate();

	const responseGoogle = (response) => {
		// console.log(response);
		const parts = response.credential.split('.');
		if (parts.length !== 3) {
			throw new Error('Invalid token format');
		}

		// console.log(form.getFieldsValue())
		const {pracId,tiusId} = form.getFieldsValue();
		
		signIn({token: response.credential, tiusId, pracId});
		console.log('pase por aca despues del signIn')
		login();
		
		history('/dashboard');
	};

	const onSubmitAdmin = (values) => {
		console.log(values);
	};

	const onSubmitUser = (values) => {
		console.log(values);
	};

	return (
		<Row style={{ backgroundColor: '#202020', width: '100%' }} justify='center' /*gutter={[16, 16]}*/>
			<Col xs={12} sm={12} md={24} lg={24} style={{ backgroundColor: 'gray' }}>
				<h3 style={{ textAlign: 'center' }}> Seguimiento y Gestión Plan De Mejoramiento</h3>
			</Col>
			{isAdmin ? (
				<Col xs={12} sm={12} md={24} lg={12} style={{ backgroundColor: 'gray' }}>
					<Form name='formLogin' layout='vertical' onFinish={onSubmitAdmin}>
						<Form.Item
							// label='Username'
							name='username'
							rules={[
								{
									required: true,
									message: 'Please input your username!',
								},
							]}
							style={{ backgroundColor: 'red' }}
							wrapperCol={{
								md: { span: 12, offset: 6 },
								lg: { span: 12, offset: 6 },
							}}
						>
							<InputItem placeholder='Digite su usuario' />
						</Form.Item>

						<Form.Item
							// label='Password'
							name='password'
							style={{ backgroundColor: 'yellowgreen' }}
							rules={[
								{
									required: true,
									message: 'Please input your password!',
								},
							]}
							wrapperCol={{
								md: { span: 12, offset: 6 },
								lg: { span: 12, offset: 6 },
							}}
						>
							<InputItemPassword placeholder='Contraseña' />
						</Form.Item>

						<Form.Item
							wrapperCol={{
								// offset: 6,
								// span: 12,
								// push:12
								md: { span: 12, offset: 6 },
							}}
							style={{ textAlign: 'center' }}
						>
							<ButtonItem type='primary' htmlType='submit'>
								Iniciar Sesión
							</ButtonItem>
						</Form.Item>
						<Form.Item
							wrapperCol={{
								md: { span: 12, offset: 6 },
							}}
							style={{ textAlign: 'center' }}
						>
							<a href='#' style={{ textDecoration: 'underline' }}>
								Olvide mi contraseña
							</a>
						</Form.Item>
					</Form>
				</Col>
			) : (
				<ColUser xs={12} sm={12} md={24} lg={12}>
					<Form style={{ backgroundColor: 'gray', width: 500 }} onFinish={onSubmitUser} form={form}>
						<Form.Item name='pracId'
						rules={[
							{
								required: true,
								message: 'Seleccione un programa academico!',
							},
						]}
						>
							<Select placeholder='Programa academico'>
								<Select.Option value='demo'>programa Demo</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item name='tiusId'
						rules={[
							{
								required: true,
								message: 'Seleccione un rol!',
							},
						]}
						>
							<Select placeholder='Seleccione un rol'>
								<Select.Option value='demo'>Director de programa</Select.Option>
							</Select>
						</Form.Item>

						<Form.Item
							// label='Username'
							name='username'
							rules={[
								{
									required: true,
									message: 'Please input your username!',
								},
							]}
							style={{ backgroundColor: 'red' }}
							wrapperCol={{
								md: { span: 12, offset: 6 },
								lg: { span: 12, offset: 6 },
							}}
						>
							<GoogleLogin
								onSuccess={(credentialResponse) => {
									responseGoogle(credentialResponse);
								}}
								onError={(error) => {
									console.log('Login Failed', error);
								}}
							></GoogleLogin>
						</Form.Item>
					</Form>
				</ColUser>
			)}
		</Row>
	);
};

LoginPage.propTypes = {
	isAdmin: PropTypes.bool.isRequired,
};

export default LoginPage;
