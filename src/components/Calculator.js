import React from "react";
import Button from "./Button";
import Display from "./Display";
import "./Calculator.css";

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0
};

export default class Calculator extends React.Component {
  constructor(props){
    super(props);
    this.state = { ...initialState };
  }

  clearMemory = () => {
    this.setState({ ...initialState });
  }

  setOperation = operation => {
    if(this.state.current === 0){
      // guarda a operação e prepara para digitar o segundo valor
      this.setState({ operation, current: 1, clearDisplay: true });
    }else{
      // calcula o resultado
      const equals = operation === '=';
      const currentOperation = this.state.operation;
      
      const values = [...this.state.values];
      values[0] = this.execOperation(values, currentOperation);
      values[1] = 0;

      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      });
    }
  }

  execOperation = (values, operation) => {
    switch(operation){
      case '+':
        return values[0] + values[1];
      case '-':
        return values[0] - values[1];
      case '*':
        return values[0] * values[1];
      case '/':
        return values[0] / values[1];
      default:
        return values[0];
    }
  }

  addDigit = digit => {
    // não permite usar dois pontos
    if(digit === '.' && this.state.displayValue.includes('.')){
      return;
    }
    // limpa o display se tiver apenas zero ou antes de inserir um novo número
    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
    // mostra o novo valor
    const currentValue = clearDisplay ? '' : this.state.displayValue;
    const displayValue = currentValue + digit;
    this.setState({ displayValue, clearDisplay: false });
    // guarda o valor mostrado em this.state.values
    if(digit !== '.'){
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      console.log(newValue)
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
    }
  }

  render() {
    return <div className="calculator">
      <Display value={this.state.displayValue} />
      <Button label="AC" click={this.clearMemory} triple />
      <Button label="/" click={this.setOperation} operation />
      <Button label="7" click={this.addDigit} />
      <Button label="8" click={this.addDigit} />
      <Button label="9" click={this.addDigit} />
      <Button label="*" click={this.setOperation} operation />
      <Button label="4" click={this.addDigit} />
      <Button label="5" click={this.addDigit} />
      <Button label="6" click={this.addDigit} />
      <Button label="-" click={this.setOperation} operation />
      <Button label="1" click={this.addDigit} />
      <Button label="2" click={this.addDigit} />
      <Button label="3" click={this.addDigit} />
      <Button label="+" click={this.setOperation} operation />
      <Button label="0" click={this.addDigit} double />
      <Button label="." click={this.addDigit} />
      <Button label="=" click={this.setOperation} operation />
    </div>;
  }
}
