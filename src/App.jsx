import './App.sass'
export const App = () => {

	return (
		<>
		<h1>Калькулятор растаможки автомобиля</h1>
		<form id="calc">

			<label>
				<span>Объем двигателя, см<sup>3</sup></span>
				<input type="number" required="required" placeholder="например, 2000" name="volume"/>
			</label>

			<label>
				<span>Стоимость автомобиля, €</span>
				<input type="number" required="required" name="car_price"/>
			</label>

			<div className="face">
				<label>
					<input type="radio" name="face" defaultChecked="checked" id="fiz"/>
					<span>Физ. лицо</span>
				</label>

				<label>
					<input type="radio" name="face" id="ur"/>
					<span>Юр. лицо</span>
				</label>
			</div>

			<label>
				<span>Год выпуска авто</span>
				<input type="number" required="required" name="car_year" placeholder="например, 2015"/>
			</label>

			<div className="disc">
				<label>
					<input type="checkbox" name="discount"/>
					<span>Льготы 50%: многодетная семья или инвалид I/II группы</span>
				</label>
			</div>

			<input type="submit" value="Рассчитать пошлину" />
		</form>
		</>
	)
}

export default App
