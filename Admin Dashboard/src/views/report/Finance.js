import CIcon from '@coreui/icons-react'
import {
    CButton,
    CButtonGroup, CCard,
    CCardBody,
    CCol,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle, CRow
} from '@coreui/react'
import {
    CChartBar,
    CChartLine
} from '@coreui/react-chartjs'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDetails, getOrderDetails } from '../../actions/orderdetails'
import { onGetListOrder } from '../../actions/orders'


var totalWeek = [0, 0, 0, 0];
var totalMonth = [];
var nameTopProduct = [];
var quantityTopProduct = [];

const Finance = () => {
    const dispatch = useDispatch();
    var newDate = new Date();
    const [report, setReport] = React.useState('Month');
    const [list7Days, setList7Days] = React.useState([]);
    const [report7Days, setReport7Days] = React.useState([]);
    const [month, setMonth] = React.useState(newDate.getMonth() + 1);
    let { ListOrder } = useSelector(state => state.orders);
    const {ListTopProduct} = useSelector(state => state.productByDetails);

    if(ListTopProduct.length > 0){
        nameTopProduct = [];
        quantityTopProduct = [];
        for(let i = 0 ; i < ListTopProduct.length ; i++){
            nameTopProduct.push(ListTopProduct[i].name);
            quantityTopProduct.push(ListTopProduct[i].quantity);
        }
    }

    useEffect(() => {
        dispatch(onGetListOrder())
        dispatch(getAllDetails());
    }, [dispatch])

    useEffect(() => {
        const reports = () => {
            if (ListOrder.length > 0) {
                ReportByMonth();
            }
        }
        reports()
    }, [ListOrder])

    const ChangeReport = (event) => {
        setReport(event.target.name);

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        if (event.target.name === "Last 7 Days") {
            var newDays = [];
            for (let i = 0; i < 6; i++) {
                var date = new Date();
                date.setDate(date.getDate() - i);
                newDays.push(days[date.getDay()]);
            }
            setList7Days(newDays);

            if (ListOrder.length > 0) {
                var ListPrice = [];
                for (let day = 0; day < 6; day++) {
                    var total = 0;
                    var newDate = new Date();
                    newDate.setDate(newDate.getDate() - day);
                    for (let j = 0; j < ListOrder.length; j++) {
                        var dateCreate = new Date(ListOrder[j].dateCreate);
                        if (dateCreate.getDate() === newDate.getDate()
                            && newDate.getMonth() === dateCreate.getMonth()
                            && ListOrder[j].status === 1) {
                            total += ListOrder[j].total
                        }
                    }
                    ListPrice.push(total);
                }
            }
            setReport7Days(ListPrice);
            ListPrice = [];
        }

        if (event.target.name === "Week Of Month") {
            const newDate = new Date();
            WeekOfMonth(newDate.getMonth() + 1);
        }

        if (event.target.name === "Month") {
            ReportByMonth();
        }
    }

    const WeekOfMonth = (month) => {
        if (ListOrder.length > 0) {
            totalWeek = [0, 0, 0, 0];
            for (let i = 0; i < ListOrder.length; i++) {
                var monthOrder = ListOrder[i].dateCreate.substring(5, 7);
                if (month === parseInt(monthOrder, 10)) {
                    var k = parseInt(ListOrder[i].dateCreate.substring(8, 10), 10);
                    if (k < 8) {
                        if (ListOrder[i].status === 1) {
                            totalWeek[0] += ListOrder[i].total;
                        }
                    }
                    else if (k >= 8 && k < 15) {
                        if (ListOrder[i].status === 1) {
                            totalWeek[1] += ListOrder[i].total;
                        }
                    }
                    else if (k >= 15 && k < 22) {
                        if (ListOrder[i].status === 1) {
                            totalWeek[2] += ListOrder[i].total;
                        }
                    }
                    else {
                        if (ListOrder[i].status === 1) {
                            totalWeek[3] += ListOrder[i].total;
                        }
                    }
                }
            }
        }
    }

    const ChangeMonth = (event) => {
        setMonth(1 + parseInt(event.target.name, 10));
        if (report === 'Week Of Month') {
            WeekOfMonth((1 + parseInt(event.target.name, 10)));
        }
    }

    const ReportByMonth = () => {
        const newDate = new Date();
        let total = 0;
        totalMonth = [];
        if (ListOrder.length > 0) {
            for (let i = 1; i <= newDate.getMonth() + 1; i++) {
                total = 0;
                for (let k = 0; k < ListOrder.length; k++) {
                    var monthOrder = ListOrder[k].dateCreate.substring(5, 7);
                    var yearOrder = ListOrder[k].dateCreate.substring(0, 4);
                    if (i === parseInt(monthOrder, 10) && ListOrder[k].status === 1 && newDate.getFullYear() === parseInt(yearOrder)) {
                        total += ListOrder[k].total;
                    }
                }
                totalMonth.push(total);
            }
        }
    }

    return (
        <>
            <div className="card">
                <CCard>
                    <CCardBody>
                        <CRow >
                            <CCol sm="5">
                                <h4 id="traffic" className="card-title mb-0">Statistics by {report}</h4>
                            </CCol>
                            <CCol sm="7" className="d-none d-md-block">
                                <CButton color="primary" className="float-right">
                                    <CIcon name="cil-cloud-download" />
                                </CButton>

                                <CButtonGroup className="float-right mr-3">
                                    <CDropdown className="m-1 btn-group">
                                        <CDropdownToggle color="secondary">
                                            {report}
                                        </CDropdownToggle>
                                        <CDropdownMenu>
                                            {
                                                ['Last 7 Days', 'Week Of Month', 'Month'].map((value, index) => (
                                                    <CDropdownItem name={value}
                                                        key={index}
                                                        onClick={event => ChangeReport(event)}>
                                                        {value}</CDropdownItem>
                                                ))
                                            }
                                        </CDropdownMenu>
                                    </CDropdown>
                                </CButtonGroup>

                                {report === 'Week Of Month' ? <CButtonGroup className="float-right mr-3">
                                    <CDropdown className="m-1 btn-group">
                                        <CDropdownToggle color="secondary">
                                            {month}
                                        </CDropdownToggle>
                                        <CDropdownMenu>
                                            {
                                                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((value, index) => (
                                                    <CDropdownItem
                                                        name={value}
                                                        key={index}
                                                        onClick={event => ChangeMonth(event)}
                                                    >
                                                        {value + 1}</CDropdownItem>
                                                ))
                                            }
                                        </CDropdownMenu>
                                    </CDropdown>
                                </CButtonGroup> : null}
                            </CCol>
                        </CRow>
                        <CCol sm="11">
                            {report === "Month" ? <CChartLine
                                type="line"
                                datasets={[
                                    {
                                        label: report,
                                        backgroundColor: 'rgb(0,216,255,0.9)',
                                        data: totalMonth
                                    }
                                ]}
                                options={{
                                    tooltips: {
                                        enabled: true
                                    }
                                }}
                                labels="months"
                            /> : (report === "Last 7 Days" ? <CChartBar
                                type="bar"
                                datasets={[
                                    {
                                        label: report,
                                        backgroundColor: '#f87979',
                                        data: report7Days
                                    }
                                ]}
                                labels={list7Days}
                                options={{
                                    tooltips: {
                                        enabled: true
                                    }
                                }}
                            /> : (report === "Week Of Month" ? <CChartLine
                                type="line"
                                datasets={[
                                    {
                                        label: report,
                                        backgroundColor: 'rgb(0,216,255,0.9)',
                                        data: totalWeek
                                    }
                                ]}
                                options={{
                                    tooltips: {
                                        enabled: true
                                    }
                                }}
                                labels={["Week 1", "Week 2", "Week 3", "Week 4"]}
                            /> : null))}
                        </CCol>
                    </CCardBody>
                </CCard>
            </div>

            <div className="card">
                <CCard>
                    <CCardBody>
                        <CRow>
                            <CCol sm="5">
                                <h4 id="traffic" className="card-title mb-0">Top 10 Best Selling Products This Month</h4>
                            </CCol>
                            <CCol sm="7" className="d-none d-md-block">
                                <CButton color="primary" className="float-right">
                                    <CIcon name="cil-cloud-download" />
                                </CButton>
                            </CCol>
                        </CRow>
                        <CCol sm="11">
                            <CChartBar
                                type="bar"
                                datasets={[
                                    {
                                        label: "Quantity",
                                        backgroundColor: '#f87979',
                                        data: quantityTopProduct
                                    }
                                ]}
                                labels={nameTopProduct}
                                options={{
                                    tooltips: {
                                        enabled: true
                                    }
                                }}
                            />
                        </CCol>
                    </CCardBody>
                </CCard>
            </div>
        </>
    )

}

export default Finance