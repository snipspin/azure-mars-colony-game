import React, {useState, useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'
import GameSpace from './GameSpace'

const Content = (props) => {
	let [water, setWater] = useState(100)
	let [food, setFood] = useState(200)
	let [people, setPeople] = useState(100)

		// Get the initial set of buildings owned by player
		const [buildings, setBuildings] = useState([])
		const [worldSize, setWorldSize] = useState(9)
		// const [activeContent, setActiveContent] = useState('active')
		useEffect(() => {
			setBuildings([
				{type:"empty", level:0, lot:0},
				{type:"water", level:1, lot:1},
				{type:"food", level:1, lot:2},
				{type:"empty", level:0, lot:3},
				{type:"empty", level:0, lot:4},
				{type:"empty", level:0, lot:5},
				{type:"empty", level:0, lot:6},
				{type:"empty", level:0, lot:7},
				{type:"empty", level:0, lot:8}
			])
		},[])
	
		function addNewBuildingToLot(type,lot) {
			let currentBuildings = buildings
			let newBuilding = {type:type, level:1, lot:lot}
			currentBuildings[lot] = newBuilding
			setBuildings(currentBuildings)
		}

		function upgradeBuildingInLot(lot, level) {
			let currentBuildings = buildings
			let currentBuilding = buildings[lot]
			currentBuilding.level = level
			currentBuildings[lot] = currentBuilding
			setBuildings(currentBuildings)
		}

	return (
		<GameSpace water={water} food={food} people={people} setWater={setWater} setFood={setFood} setPeople={setPeople} addNewBuildingToLot={addNewBuildingToLot} upgradeBuildingInLot={upgradeBuildingInLot} buildings={buildings} setBuildings={setBuildings} worldSize={worldSize} setWorldSize={setWorldSize} />
	)
}
export default Content