import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    console.log("Constructor / Render");
  }

  componentDidMount() {
    this.setState({ count: 1 });
    console.log("Component did mounted");
  }

  componentDidUpdate() {
    console.log("Component did update");
    if (this.state.count === 10) {
      this.setState({ count: 5 });
    }
  }

  render() {
    return (
      <div className="flex items-center">
        <h1 className="mr-5">{this.state.count}</h1>
        <button
          className="bg-black text-white p-3"
          //~ Merubah ketika diklik langsung ditampilkan hasilnya/apa yang diinginkan
          //   onClick={() => this.setState({ count: 100000000 })}
          //~ Menambah satu persatu
          onClick={() => this.setState({ count: this.state.count + 1 })}
        >
          +
        </button>
        {console.log("Render")}
      </div>
    );
  }
}

export default Counter;
