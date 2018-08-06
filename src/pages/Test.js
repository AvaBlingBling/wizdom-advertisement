import React, { Component } from 'react';

import CustomInput from './CustomInput';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: [1, 2, 3],
        }
    }

    downLoad = () => {
        // var elemIF = document.createElement("iframe");
        // elemIF.src = 'http://down.360safe.com/360safe_cq.exe';  
        // elemIF.style.display = "none";
        // document.body.appendChild(elemIF);
        window.location.href = 'http://down.360safe.com/360safe_cq.exe';
    }


    onChange = value => {
        this.setState({
            count: [...this.state.count, 5],
        })
    }
    render() {
        return (
            <div className="test" style={{ margin: '50px auto', width: '50px' }}>
                <iframe src="test.html" style={{ height: 500, width: 500 }} />
                <div>输入框</div>
                <pre>{this.state.count}</pre>
                <CustomInput defaultValue={this.state.count} onChange={this.onChange} />
                <a href="http://down.360safe.com/360safe_cq.exe?a=1" download="360safe_cq.exe">点击下载</a>
            </div>
        );
    }
}

export default App;
