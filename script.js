
class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            pText:"Text",
            url:"",
            ErrorText:"",
            infoDiv:"none",
            errorDiv:"block",
            status:"404",
        }
        this.changeValue = this.changeValue.bind(this);
    }
    changeValue(event){
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${event.target.value}&appid=dad55776f3cbe0d913be385cf37b2b91&lang=ua&units=metric`)
        .then((response)=>{
            this.setState({
                infoDiv:"block",
                errorDiv:"none",
                data:response.data,
                status:"200"
            })
        })
        .catch((error) =>{
           this.setState({
            infoDiv:"none",
            errorDiv:"block",
            status:"404"
        })
})
    }

    render(){
        return(
        <div>
            <div>
                <input onInput={this.changeValue} type="text" class="form-control" placeholder="Введіть назву міста:"/>
            </div>
            <div class="info_container">
                <p className={this.state.errorDiv}>
                    Введіть повну назву міста!)
                </p>
                <Info status={this.state.status} data={this.state.data}  display={this.state.infoDiv}></Info>
            </div>
        </div>
        )
    }
}

class Info extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        console.log(this.props);
        if(this.props.status == "200"){
            console.log(this.props.data.weather[0].icon);
            return(
                <div className={this.props.display}>
                    <div className='d-flex'>
                    <div>
                        <div class="time_container">
                            <span >{new Date().toLocaleDateString()}, {new Date().getHours()}:{new Date().getMinutes()}</span>
                        </div>
                        <div class="header_card">
                            <h1>{this.props.data.name},{this.props.data.sys.country}</h1>
                        </div>
                            <span className='speed_info1'>{this.props.data.weather[0].description}</span>
                        <div class="temp_info">
                            <h1>{Math.trunc(this.props.data.main.temp)}°C</h1>
                        </div>
                    </div>
                    <div className="icons_cont">
                        <div class="img_container">
                        <img src={`http://openweathermap.org/img/wn/${this.props.data.weather[0].icon}@2x.png`} />
                        </div>
                        <div>
                            <p class="speed_info">Вітер: {this.props.data.wind.speed} км/г</p>
                        </div>
                    </div>
                    </div>
                </div>
            )
        }
        else{
            return("")
        }
    }
}

ReactDOM
.createRoot(document.getElementById("root"))
.render(<Weather></Weather>);