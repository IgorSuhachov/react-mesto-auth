import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import logo from '../images/logo.svg'

function Header({ handleSignout, userEmail }) {
	return (
		<header className="header">
			<img src={logo} alt="логотип" className="header__logo" />
			<Routes>
				<Route
					path="/sign-up"
					element={
						<Link to="/sign-in" className="identification__route">
							Войти
						</Link>
					}
				/>
				<Route
					path="/sign-in"
					element={
						<Link to="/sign-up" className="identification__route">
							Регистрация
						</Link>
					}
				/>
				<Route
					path="/"
					element={
						<>
							<div className="identification__block">
								<p className="identification__email">{userEmail}</p>
								<Link to="/sign-in" className="identification__logout" onClick={handleSignout}>
									Выйти
								</Link>
							</div>
						</>
					}
				/>
			</Routes>
		</header>
	)
}

export default Header
