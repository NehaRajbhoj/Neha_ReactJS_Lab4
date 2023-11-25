import { ChangeEvent, Component, FormEvent } from "react"
import { pushDataToServer } from "../services/DataService"
type Props = {
    onTrue : any,
    onClose : any
}
type State = {
    product: string
    price: number
    payeeName: string
    setDate: string
}

class ExpenseTracker extends Component<Props, State> {
    constructor(props: Props){
        super(props)
        this.state = {
            payeeName: "",
            product: "",
            price: 0,
            setDate: this.setDefaultDate()
        }
        this.setPayee = this.setPayee.bind(this)
        this.setProduct = this.setProduct.bind(this)
        this.setPrice = this.setPrice.bind(this)
        this.entryDate = this.entryDate.bind(this)
    }
setDefaultDate = () =>{
    const today = new Date()
    return today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate()
}
setPayee = (e : ChangeEvent <HTMLSelectElement>) => {
    this.setState({
        payeeName: e.target.value
    })
}
setProduct = (e: ChangeEvent <HTMLInputElement>) => {
    this.setState({
        product: e.target.value
    })
}
setPrice = (e: ChangeEvent <HTMLInputElement>) => {
    this.setState({
        price: parseInt(e.target.value)
    })
}
entryDate = (e: ChangeEvent <HTMLInputElement>) => {
    this.setState({
        setDate: e.target.value
    })
}
submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const finalData = {
        ... this.state
    }
    const res = await pushDataToServer(finalData)
    this.props.onTrue()
}
render () {
    const elem = (
        <>
        <section>
            <header>
                <h1>Add New Item</h1>
                <p> Read the below Instructions before proceeding:</p>
                <p>Make sure you fill all the fields where * is provided</p>
            </header>
            <form onSubmit={this.submitForm}>
                <article>
                    <p>Name</p>
                    <select name="Name" id="" required value={this.state.payeeName} onChange={this.setPayee}>
                        <option value="" defaultChecked>Choose</option>
                        <option value="Rahul">Rahul</option>
                        <option value="Ramesh">Ramesh</option>
                    </select>
                </article>
                <article>
                    <p>Product Purchased</p>
                    <input type="text" required value={this.state.product} onChange={this.setProduct}/>
                </article>
                <article>
                    <p>Price</p>
                    <input type="text" required value={this.state.price} onChange={this.setPrice}/>
                </article>
                <article>
                    <p>Date</p>
                    <input type="date" required value={this.state.setDate} onChange={this.entryDate}/>
                </article>
                <button className="form-button" onClick={this.props.onClose}>Close</button>
                <button className="form-button" type="submit">Submit</button>
            </form>
        </section>
        </>
    )
    return elem
}

}

export default ExpenseTracker