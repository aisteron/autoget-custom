import { useState } from 'react'
import './App.sass'
export const App = () => {

	const[vol, setVol] = useState('') 							// объем двигателя
	const[price, setPrice] = useState('') 					// цена авто
	const[face, setFace] = useState('fiz') 					// юр. лицо или физ.
	const[year, setYear] = useState('') 						// год выпуска авто
	const[discount, setDiscount] = useState(false) 	// есть ли скидка


	let final = calc(vol, price, face, year, discount);


	return (
		<>
		<h1>Калькулятор растаможки автомобиля</h1>
		<form id="calc">

			<label>
				<span>Объем двигателя, см<sup>3</sup></span>
				<input type="number" required="required" placeholder="например, 2000" name="volume"
					className={`${!vol ? 'error': ''}`}
					onChange={e=>setVol(e.target.value)}
					/>
			</label>

			<label>
				<span>Стоимость автомобиля, €</span>
				<input type="number" required="required" name="price"
				className={`${!price ? 'error': ''}`}
				onChange={e=>setPrice(e.target.value)}/>
			</label>

			<div className="face">
				<label>
					<input type="radio" name="face" defaultChecked="checked" id="fiz"
					onChange={_=>setFace("fiz")}
					/>
					<span>Физ. лицо</span>
				</label>

				<label>
					<input type="radio" name="face" id="ur"
					onChange={_=>(setFace("ur"), setDiscount(false))}/>
					<span>Юр. лицо</span>
				</label>
			</div>

			<label>
				<span>Год выпуска авто</span>
				<input type="number" required="required" name="car_year" placeholder="например, 2015"
				max={new Date().getFullYear()}
				className={`${!year ? 'error': ''}`}
				onChange={e=>setYear(e.target.value)}
				/>
			</label>
			
			{face == 'fiz'
				?
					<div className="discount">
						<label>
							<input type="checkbox" name="discount"
							onChange={e=>setDiscount(e.target.checked)}
							/>
							<span>Льготы 50%: многодетная семья или инвалид I/II группы</span>
						</label>
					</div>
				: ''	
			}
			

		</form>
		{final ? <h2>Итого: {final.toFixed(2)} EUR</h2>:''}
		</>
	)
}

export default App

const calc = (vol, price, face, year, discount) => {

	let current_year = new Date().getFullYear()
	let period = current_year - year
	let final = 0

	if(face == "fiz"){
		period < 3 && (final = fiz_period3(vol, price));
		(period >= 3 && period <= 5) && (final = fiz_period35(vol));
		period > 5 && (final = fiz_period5(vol));
	}

	if(face == "ur"){
		period < 3 && (final = ur_period3(vol, price));
		(period >= 3 && period <= 5) && (final = ur_period35(vol, price));
		period > 5 && (final = ur_period5(vol, price));
	}

	discount && (final = final / 2)

	return final
}



function fiz_period3(engine_volume, car_price){

	switch(true){
		
		case car_price <= 8500:
			return car_price * 0.54 < 2.5 * engine_volume
			? 2.5 * engine_volume
			: car_price * 0.54

		case car_price > 8500 && car_price <= 16700:
			if(car_price * 0.48 < 3.5 * engine_volume)
			return 3.5 * engine_volume

		case car_price > 16700 && car_price <= 42300:
			if(car_price * 0.48 < 5.5 * engine_volume)
			return 5.5 * engine_volume

		case car_price > 42300 && car_price <= 84500:
			if(car_price * 0.48 < 7.5 * engine_volume)
			return 7.5 * engine_volume

		case car_price > 84500 && car_price <= 169000:
			if(car_price * 0.48 < 15 * engine_volume)
			return 15 * engine_volume

		case car_price > 169000:
			if(car_price * 0.48 < 20 * engine_volume)
			return 20 * engine_volume

		default:	
			return car_price * 0.48	
	}

	

}
function fiz_period35(engine_volume){
	let mod = 0;
	
	switch(true){

		case engine_volume <= 1000:
			mod = 1.5;
			break;

		case engine_volume > 1000 && engine_volume <= 1500:	
			mod = 1.7;
			break;
		
		case engine_volume > 1500 && engine_volume <= 1800:	
			mod = 2.5;
			break;

		case engine_volume > 1800 && engine_volume <= 2300:	
			mod = 2.7;
			break;
		
		case engine_volume > 2300 && engine_volume <= 3000:	
			mod = 3;
			break;			
		
		case engine_volume > 3000:	
			mod = 3.6;
			break;			

	}

	return mod * engine_volume
}
function fiz_period5(engine_volume){
	let mod = 0;
	
	switch(true){

		case engine_volume <= 1000:
			mod = 3;
			break;

		case engine_volume > 1000 && engine_volume <= 1500:	
			mod = 3.2;
			break;
		
		case engine_volume > 1500 && engine_volume <= 1800:	
			mod = 3.5;
			break;

		case engine_volume > 1800 && engine_volume <= 2300:	
			mod = 4.8;
			break;
		
		case engine_volume > 2300 && engine_volume <= 3000:	
			mod = 5;
			break;			
		
		case engine_volume > 3000:	
			mod = 5.7;
			break;			

	}

	return mod * engine_volume
}

function ur_period3(ev, price){

	switch(true){
		case ev <= 1000:
			return price * 0.23 < 1.2 * ev
			? 1.2 * ev
			: price * 0.23
		
		case ev > 1000 && ev <= 1500:
			if(price * 0.23 < 1.45 * ev)
			return 1.45 * ev
		
		case ev > 1500 && ev <= 1800:
			if(price * 0.23 < 1.5 * ev)
			return 1.5 * ev
		
		case ev > 1800 && ev <= 2300:
			if(price * 0.23 < 2.15 * ev)
			return 2.15 * ev
		
		case ev > 2300 && ev <= 3000:
			if(price * 0.23 < 2.15 * ev)
			return 2.15 * ev
		
		case ev > 3000:
			if(price * 0.23 < 2.8 * ev)
			return 2.8 * ev

		default:
			return price * 0.23
	}
}

function ur_period35(ev, price){
	
	switch(true){
		case ev <= 1000:
			return price * 0.35 < 1.2 * ev
			? 1.2 * ev
			: price * 0.35
		
		case ev > 1000 && ev <= 1500:
			if(price * 0.35 < 1.45 * ev)
			return 1.45 * ev
		
		case ev > 1500 && ev <= 1800:
			if(price * 0.35 < 1.5 * ev)
			return 1.5 * ev
		
		case ev > 1800 && ev <= 2300:
			if(price * 0.35 < 2.15 * ev)
			return 2.15 * ev
		
		case ev > 2300 && ev <= 3000:
			if(price * 0.35 < 2.15 * ev)
			return 2.15 * ev
		
		case ev > 3000:
			if(price * 0.35 < 2.8 * ev)
			return 2.8 * ev

		default:
			return price * 0.35
	}
}

function ur_period5(ev){
	let mod = 0;
	
	switch(true){

		case ev <= 1000:
			mod = 2.5;
			break;

		case ev > 1000 && ev <= 1500:	
			mod = 2.7;
			break;
		
		case ev > 1500 && ev <= 1800:	
			mod = 2.9;
			break;

		case ev > 1800 && ev <= 2300:	
			mod = 4;
			break;
		
		case ev > 2300 && ev <= 3000:	
			mod = 4;
			break;			
		
		case ev > 3000:	
			mod = 5.8;
			break;			

	}

	return mod * ev
}


