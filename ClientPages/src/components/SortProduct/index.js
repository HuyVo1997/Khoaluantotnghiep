import React, { Component } from 'react'

class SortProduct extends Component {

    onChangeSort = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        if (parseInt(value, 10) === 1) {
            this.props.onSort('name', 1);
        }
        else if (parseInt(value, 10) === 2) {
            this.props.onSort('name', -1);
        }
        else if (parseInt(value, 10) === 3) {
            this.props.onSort('price', -1);
        }
        else {
            this.props.onSort('price', 1);
        }
    }

    render() {

        return (
            <div className="main-toolbar-sorter clearfix">
                <div className="toolbar-sorter d-md-flex align-items-center">
                    <label>Sort By:</label>
                    <select className="sorter wide" onChange={this.onChangeSort}>
                        <option value={1}>Name, A to Z</option>
                        <option value={2} >Name, Z to A</option>
                        <option value={3}>Price low to heigh</option>
                        <option value={4}>Price heigh to low</option>
                    </select>
                </div>
            </div>
        )
    }
}

export default SortProduct;