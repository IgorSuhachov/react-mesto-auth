import React from 'react'
import { useForm } from '../hooks/useForm'

export default function Login({ handleLogin }) {
	const { values, handleChange } = useForm({
		email: '',
		password: '',
	})

	function handleSubmit(e) {
		e.preventDefault()
		handleLogin(values.email, values.password)
	}

	return (
		<>
			<div className="identification" onSubmit={handleSubmit}>
				<h2 className="identification__heading">Вход</h2>
				<form className="identification__form">
					<input
						type="email"
						name="email"
						value={values.email}
						className="identification__input"
						placeholder="Email"
						onChange={handleChange}
						required
					/>
					<input
						type="password"
						name="password"
						value={values.password}
						className="identification__input"
						placeholder="Пароль"
						onChange={handleChange}
						required
					/>
					<button className="identification__button" type="submit">
						Войти
					</button>
				</form>
			</div>
		</>
	)
}
