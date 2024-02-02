/* eslint-disable array-callback-return */
import React, { useState } from 'react'
import "../../Styles/search.css"
import Card from './Card';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import loggerComponent from '../../utils/logger'
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import CardPlaces from "../../components/userComponent/CardPlaces"

function SearchBar() {
  const navigate = useNavigate()
  const { Places, Categories, Activities, Cities } = useSelector(state => state.place)
  const { value } = useSelector(state => state.login)
  const { idUser, dataUser } = useSelector(state => state.user)
  const [cityBtn, setCitiesBtn] = useState(null)
  const [wordEntered, setWordEntered] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [printArray, setPrintArray] = useState([])
  const [searchBool, setSearchBool] = useState(false)
  const [checkedValuesCat, setCheckedValuesCat] = useState([])
  const [checkedValuesAct, setCheckedValuesAct] = useState([])
  const [iconSearch, setIconSearch] = useState(true)
  const [iconFilter, setIconFilter] = useState(true)
  const clearFilter = () => {
    setIconSearch(!iconSearch)
    setFilteredData([])
    setWordEntered("")
    setIconFilter(!iconFilter)
  }
  const handlFilter = async () => {
    const searchWord = wordEntered;
    setIconSearch(!iconSearch)
    var message
    if (value === true) {
      message = { action: `search on ${wordEntered}  `, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, }
    } else { message = { action: `search on ${wordEntered}  ` } }
    loggerComponent(message)
    if (searchWord === "") { setFilteredData([]); }
    const newFilterCities = await Cities.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    const newFilterPlaces = await Places.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    const newFilterActivities = await Activities.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    setFilteredData(newFilterPlaces.concat(newFilterCities.concat(newFilterActivities)))
  }
  //chaked categories
  const handleChangeCat = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setCheckedValuesCat(pre => [...pre, value])
    } else {
      setCheckedValuesCat(pre => {
        return [...pre.filter(cat => cat !== value)]
      })
    }
  }
  //checked Activities
  const handleChangeAct = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setCheckedValuesAct(pre => [...pre, value])
    } else {
      setCheckedValuesAct(pre => {
        return [...pre.filter(act => act !== value)]
      })
    }
  }
  const search = () => {
    setSearchBool(!searchBool)
    const print = []
    var chaineAct
    var chaineCat
    if (checkedValuesAct.length !== 0 && checkedValuesCat.length !== 0) {
      var message
      chaineAct = checkedValuesAct.join(",")
      chaineCat = checkedValuesCat.join(",")
      if (value === true) {
        message = { action: `search on places that have as category ${chaineCat.toLocaleLowerCase()} and as activity ${chaineAct.toLocaleLowerCase()}  `, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, }
      } else { message = { action: ` search on places that have as category ${chaineCat.toLocaleLowerCase()} and as activity ${chaineAct.toLocaleLowerCase()}  ` } }
      loggerComponent(message)
      for (const place of Places) {
        for (const category of place.categories) {
          if (checkedValuesCat.includes(category.title)) {
            for (const activity of place.activities) {
              if (checkedValuesAct.includes(activity.name)) {
                if (!print.includes(place)) {
                  print.push(place)
                }
              }
            }
          }
        }
      }
    } else if (checkedValuesAct.length === 0 && checkedValuesCat.length !== 0) {
      chaineCat = checkedValuesCat.join(",")
      if (value === true) {
        message = { action: `search on places that have as category ${chaineCat.toLocaleLowerCase()}`, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, }
      } else { message = { action: `search on places that have as category ${chaineCat.toLocaleLowerCase()} ` } }
      loggerComponent(message)
      for (const place of Places) {
        for (const category of place.categories) {
          if (checkedValuesCat.includes(category.title)) {
            if (!print.includes(place)) {
              print.push(place)
            }
          }
        }
      }
    } else if (checkedValuesAct.length !== 0 && checkedValuesCat.length === 0) {
      chaineAct = checkedValuesAct.join(",")
      if (value === true) {
        message = { action: `search on places that have as activity ${chaineAct.toLocaleLowerCase()}  `, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, }
      } else { message = { action: `search on places that have as activity ${chaineAct.toLocaleLowerCase()}  ` } }
      loggerComponent(message)
      for (const place of Places) {
        for (const activity of place.activities) {
          if (checkedValuesAct.includes(activity.name)) {
            if (!print.includes(place)) {
              print.push(place)
            }
          }
        }
      }
    }
    setPrintArray(print)
  }
  const navToDis = (distination) => {
    var message
    const id = distination._id
    if (Places.includes(distination)) {
      if (value === true) {
        message = { action: `nav from search page to place ${distination.name}  `, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idPlace: id, placeName: distination.name.toLocaleLowerCase(), }
      } else { message = { action: `nav from search page to place ${distination.name.toLowerCase()}  ` } }
      navigate(`/places/${id}`)
    } else if (Cities.includes(distination)) {
      if (value === true) {
        message = { action: `nav from search page to city ${distination.name}  `, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idCity: id, cityName: distination.name.toLowerCase(), }
      } else { message = { action: `Nav from search page to place ${distination.name.toLowerCase()}  ` } }
      navigate(`/cities/${id}`)
    } else if (Activities.includes(distination)) {
      if (value === true) {
        message = { action: `nav from search page to activity ${distination.name}  `, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idActivity: id, activityName: distination.name.toLowerCase(), }
      } else {
        message = { action: `nav from search page to place ${distination.name.toLowerCase()}  ` }
      }
      navigate(`/activites/${id}`)
    }
    loggerComponent(message)
  }
  return (
    <div className='container-search'>
      <div className='search-header'>
        <div className='searchBar'>
          <div className='input-search-container-searchbar'>
            <input type="text" className='input-search' value={wordEntered} placeholder='Search...' onChange={(e) => { setWordEntered(e.target.value) }} />
            {iconSearch && <SearchIcon style={{ fontSize: 45, color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.6)', height: '5vh', cursor: "pointer" }} onClick={handlFilter} />}
            {!iconSearch && <SearchOffIcon style={{ fontSize: 45, color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.6)', height: '5vh', cursor: "pointer" }} onClick={clearFilter} />}
          </div>
          {/* resultat de input  */}
          {filteredData.length !== 0 && (
            <div className="dataResult">
              {filteredData.map((value, key) => {
                return (<p key={key} onClick={() => { navToDis(value) }}  >{value.name} </p>);
              })}
            </div>
          )}
        </div>
        <div className='Filters'>
          <div>
            <h5>Categories</h5>
            <div className='filters-choice'>
              {Categories && Categories.map((item, index) => {
                return (
                  <div className='Filters-input-label' key={index}>
                    <input className='input-type-radio' type="checkbox" value={item.title} onChange={handleChangeCat} />
                    <label>{item.title}</label>
                  </div>
                )
              })}
            </div>
          </div>
          <div>
            <h5>Activities</h5>
            <div className='filters-choice'>
              {Activities && Activities.map((item, index) => {
                return (
                  <div className='Filters-input-label' key={index}>
                    <input className='input-type-radio' type="checkbox" value={item.name} onChange={handleChangeAct} />
                    <label>{item.name}</label>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='search-btn'> <button onClick={search}>Search</button></div>
          <div>
            <h5>Cities</h5>
            <div className='filters-choice'>
              {Cities.map((item, index) => {
                return (
                  <div key={index} className='Filters-input-label'>
                    <input className='input-type-radio' type="radio" name='city-btn-radio' value={item.name}
                      onChange={(e) => {
                        setCitiesBtn(e.target.value)
                        var message
                        if (value === true) {
                          message = { action: `search on city ${e.target.value.toLocaleLowerCase()}  `, idUser: idUser, userFullName: `${dataUser.firstName.toLowerCase()} ${dataUser.lastName.toLowerCase()}`, idCity: item._id, cityName: item.name.toLowerCase(), }
                        } else { message = { action: `search on places that have as activity `, idCity: item._id, cityName: item.name.toLowerCase(), } }
                        loggerComponent(message)
                      }}
                    />
                    <label>{item.name}</label>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className='search_result'>
        {printArray.length === 0 && searchBool === true ? <div className='notFoundsearch'>Sorry no places  </div> :
          <div className='container-search-result' >
            {printArray.map((item, index) => {
              const id = item._id
              return (<div key={index} onClick={() => { navigate(`/places/${id}`) }}>
                <CardPlaces element={item} />
              </div>)
            })}
          </div>}
        <div className="container-search-result">
          {Cities && Cities.map((element, index) => {
            if (element.name === cityBtn) {
              return (
                <div>
                  <div style={{ fontSize: "28px", padding: "15px" }}> {element.name} city, places ...</div>
                  <Card key={index} element={element} />
                </div>)
            }
          })}
        </div>
        {cityBtn && <div>
          <div className="container-search-result">
            {Places.map((element, index) => {
              const id = element._id
              if (element.city.name === cityBtn) {
                return (
                  <div key={index} onClick={() => { navigate(`/places/${id}`) }}>
                    <CardPlaces element={element} />
                  </div>)
              }
            })}
          </div>
        </div>}
      </div>
    </div>)
}
export default SearchBar
