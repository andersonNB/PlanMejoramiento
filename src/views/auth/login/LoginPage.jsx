import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Input, Button } from 'antd';
import { GoogleLogin } from '@react-oauth/google';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ColUser = styled(Col)`
	background-color: salmon;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 15vh;
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
	const [payload, setPayload] = useState('');
	const [header, setHeader] = useState('');
	const history = useNavigate();

	const responseGoogle = (response) => {
		console.log(response);
		const parts = response.credential.split('.');
		if (parts.length !== 3) {
			throw new Error('Invalid token format');
		}
		const header = JSON.parse(atob(parts[0]));
		const payload = JSON.parse(atob(parts[1]));
		setPayload(payload);
		setHeader(header);
		history('/dashboard');
	};

	const onSubmit = (values) => {
		console.log(values);
	};

	return (
		<Row style={{ backgroundColor: '#202020' }} justify='center' gutter={[16, 16]}>
			<Col xs={12} sm={12} md={24} lg={24} style={{ backgroundColor: 'gray' }}>
				<h3 style={{ textAlign: 'center' }}> Seguimiento y Gestión Plan De Mejoramiento</h3>
			</Col>
			{isAdmin ? (
				<Col xs={12} sm={12} md={24} lg={12} style={{ backgroundColor: 'gray' }}>
					<Form name='formLogin' layout='vertical' onFinish={onSubmit}>
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
					<GoogleLogin
						onSuccess={(credentialResponse) => {
							responseGoogle(credentialResponse);
						}}
						onError={(error) => {
							console.log('Login Failed', error);
						}}
					></GoogleLogin>

					{payload && (
						<div>
							<h3>Token Payload</h3>
							<pre>{JSON.stringify(payload, null, 2)}</pre>
						</div>
					)}
					{header && (
						<div>
							<h3>Token Header</h3>
							<pre>{JSON.stringify(header, null, 2)}</pre>
						</div>
					)}
				</ColUser>
			)}
		</Row>
	);
};

LoginPage.propTypes = {
	isAdmin: PropTypes.bool.isRequired,
};

export default LoginPage;
