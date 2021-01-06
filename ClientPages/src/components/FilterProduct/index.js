import React, { Component } from 'react'

var filterObject = {
    RAM: 0,
    Memory: 0,
    Battery : 0
}

class FilterProduct extends Component {

    onChangeFilter = (event) => {
        var target = event.target;
        var name = target.name;
        var value =  target.type === 'checkbox' ? target.checked : target.value;

        if (name.includes("RAM")) {
            filterObject.RAM = value
        }

        if (name.includes("Memory")) {
            filterObject.Memory = value
        }

        if (name.includes("Battery")) {
            filterObject.Battery = value
        }

        this.props.onFilter(filterObject);
    }

    onFilterEvent = () => {
        var { location } = this.props;

        var result = null

        if (location.search.substring(6, 15).trim() === "Phone") {
            result = (
                <div>
                    {/* Ram Start */}
                    <div className="sidebar-categorie mb-30">
                        <h3 className="sidebar-title">RAM</h3>
                        <ul className="sidbar-style">
                            <li className="form-check">
                                <input className="form-check-input" type="radio"
                                    onChange={(event) => this.onChangeFilter(event)} defaultValue="3"
                                    name="RAM" />
                                <label className="form-check-label" >Under 4GB</label>
                            </li>
                            <li className="form-check">
                                <input className="form-check-input" defaultValue="6"
                                    onChange={(event) => this.onChangeFilter(event)} type="radio"
                                    name="RAM" />
                                <label className="form-check-label" >4GB to 6GB</label>
                            </li>
                            <li className="form-check">
                                <input className="form-check-input" defaultValue="8"
                                    onChange={(event) => this.onChangeFilter(event)} type="radio"
                                    name="RAM" />
                                <label className="form-check-label" htmlFor="Digital">8GB and Above</label>
                            </li>
                        </ul>
                    </div>
                    {/* Ram End */}

                    {/* Memory Start */}
                    <div className="size mb-30">
                        <h3 className="sidebar-title">Memory</h3>
                        <ul className="size-list sidbar-style">
                            <li className="form-check">
                                <input className="form-check-input" defaultValue="31"
                                    onChange={(event) => this.onChangeFilter(event)} type="radio" name="Memory" />
                                <label className="form-check-label" >Under 32GB</label>
                            </li>
                            <li className="form-check">
                                <input className="form-check-input" defaultValue="32"
                                    onChange={(event) => this.onChangeFilter(event)} type="radio"
                                    name="Memory" />
                                <label className="form-check-label" >32GB - 64GB</label>
                            </li>
                            <li className="form-check">
                                <input className="form-check-input" defaultValue="128"
                                    onChange={(event) => this.onChangeFilter(event)} type="radio"
                                    name="Memory" />
                                <label className="form-check-label" >128GB - 256GB</label>
                            </li>
                            <li className="form-check">
                                <input className="form-check-input" defaultValue="512"
                                    onChange={(event) => this.onChangeFilter(event)} type="radio"
                                    name="Memory" />
                                <label className="form-check-label" >512GB and Above</label>
                            </li>
                        </ul>
                    </div>
                    {/* Memory End */}

                    {/* Battery Start */}
                    <div className="size mb-30">
                        <h3 className="sidebar-title">Battery</h3>
                        <ul className="size-list sidbar-style">
                            <li className="form-check">
                                <input className="form-check-input" defaultValue="3000" type="radio" name="Battery" 
                                onChange={(event) => this.onChangeFilter(event)}/>
                                <label className="form-check-label" htmlFor="small">3000 - 5000 mAh</label>
                            </li>
                            <li className="form-check">
                                <input className="form-check-input" defaultValue="5000" type="radio" name="Battery"
                                onChange={(event) => this.onChangeFilter(event)} />
                                <label className="form-check-label" htmlFor="medium">Above 5000 mAh</label>
                            </li>
                        </ul>
                    </div>
                    {/* Battery End */}
                </div>
            )
        }
        else if (location.search.substring(6, 15).trim() === "Laptop") {
            result = (
                <div>
                    {/* Ram Start */}
                    < div className="sidebar-categorie mb-30" >
                        <h3 className="sidebar-title">RAM</h3>
                        <ul className="sidbar-style">
                            <li className="form-check">
                                <input className="form-check-input" defaultValue="#" id="camera" type="checkbox" />
                                <label className="form-check-label" htmlFor="camera">4GB</label>
                            </li>
                            <li className="form-check">
                                <input className="form-check-input" defaultValue="#" id="GamePad" type="checkbox" />
                                <label className="form-check-label" htmlFor="GamePad">8GB</label>
                            </li>
                            <li className="form-check">
                                <input className="form-check-input" defaultValue="#" id="Digital" type="checkbox" />
                                <label className="form-check-label" htmlFor="Digital">16GB</label>
                            </li>
                        </ul>
                    </div >
                    {/* Ram End */}

                    {/* Memory Start */}
                    <div className="size mb-30">
                        <h3 className="sidebar-title">CPU</h3>
                        <ul className="size-list sidbar-style">
                            <li className="form-check">
                                <input className="form-check-input" defaultValue id="small" type="checkbox" />
                                <label className="form-check-label" htmlFor="small">Intel Core i7</label>
                            </li>
                            <li className="form-check">
                                <input className="form-check-input" defaultValue id="medium" type="checkbox" />
                                <label className="form-check-label" htmlFor="medium">Intel Core i5</label>
                            </li>
                            <li className="form-check">
                                <input className="form-check-input" defaultValue id="large" type="checkbox" />
                                <label className="form-check-label" htmlFor="large">Intel Core i3</label>
                            </li>
                            <li className="form-check">
                                <input className="form-check-input" defaultValue id="large" type="checkbox" />
                                <label className="form-check-label" htmlFor="large">Intel Pentium/Celeron</label>
                            </li>
                            <li className="form-check">
                                <input className="form-check-input" defaultValue id="large" type="checkbox" />
                                <label className="form-check-label" htmlFor="large">AMD</label>
                            </li>
                        </ul>
                    </div>
                    {/* Memory End */}

                    {/* Screen Start */}
                    <div className="size mb-30">
                        <h3 className="sidebar-title">Screen</h3>
                        <ul className="size-list sidbar-style">
                            <li className="form-check">
                                <input className="form-check-input" defaultValue id="small" type="checkbox" />
                                <label className="form-check-label" htmlFor="small">Above 15 inch</label>
                            </li>
                            <li className="form-check">
                                <input className="form-check-input" defaultValue id="medium" type="checkbox" />
                                <label className="form-check-label" htmlFor="medium">14 inch</label>
                            </li>
                            <li className="form-check">
                                <input className="form-check-input" defaultValue id="large" type="checkbox" />
                                <label className="form-check-label" htmlFor="large">13 inch</label>
                            </li>
                        </ul>
                    </div>
                    {/* Screen End */}

                    {/* Screen Start */}
                    <div className="size mb-30">
                        <h3 className="sidebar-title">Disk</h3>
                        <ul className="size-list sidbar-style">
                            <li className="form-check">
                                <input className="form-check-input" defaultValue id="large" type="checkbox" />
                                <label className="form-check-label" htmlFor="large">SSD</label>
                            </li>
                            <li className="form-check">
                                <input className="form-check-input" defaultValue id="large" type="checkbox" />
                                <label className="form-check-label" htmlFor="large">HDD</label>
                            </li>
                        </ul>
                    </div>
                    {/* Screen End */}
                </div>
            )
        }
        return result;
    }

    render() {
        return (
            <div>
                {this.onFilterEvent()}
            </div>
        )
    }
}

export default FilterProduct;