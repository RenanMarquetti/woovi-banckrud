import { useState, useEffect } from 'react';



const DashboardPage = () => {
	const name = "Renan Marquetti"
	const saldo = 100.00
	const [con, setCon] = useState(0);
	const incrementCount = () => {
		setCon(con + 1);
		console.log('con: '+con);
	}

	return (
		<main>
			<h1>Dashboard Page</h1>
			<h5>Seja muito bem vindo {name}</h5>
			<h5>Saldo: R$ {100}</h5>
			
			<button onClick={incrementCount}>criar nova transação</button>


			<div> 
				<p>
					lista de transação aqui
				</p>
			</div>
		</main>
	)
}

export default DashboardPage;
