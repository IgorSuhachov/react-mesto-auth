import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../hooks/useForm'

export default function Register({ handleRegister }) {
	const { values, handleChange } = useForm({
		email: '',
		password: '',
	})

	function handleSubmit(e) {
		e.preventDefault()
		handleRegister(values.email, values.password)
	}

	return (
		<>
			<div className="identification">
				<h2 className="identification__heading">Регистрация</h2>
				<form className="identification__form" onSubmit={handleSubmit}>
					<input
						type="email"
						name="email"
						id="email"
						value={values.email}
						className="identification__input"
						placeholder="Email"
						onChange={handleChange}
						required
					/>
					<input
						type="password"
						name="password"
						id="password"
						value={values.password}
						className="identification__input"
						placeholder="Пароль"
						onChange={handleChange}
						required
					/>
					<button className="identification__button" type="submit">
						Зарегистрироваться
					</button>
					<Link to="/sign-in" className="identification__link">
						Уже зарегистрированы? Войти
					</Link>
				</form>
			</div>
		</>
	)
}
