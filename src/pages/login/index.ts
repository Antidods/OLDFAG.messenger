import Block from "../../utils/Block";
import template from "./login.hbs";
import {Button} from "../../components/buttonWindowClose";


interface LoginPageProps {
    title: string;

}

class LoginPage extends Block {
    constructor(props: LoginPageProps) {
        super(props);
    }

    init(){
        this.children.button = new Button({
            label:'',
            class:'main-window__manager_close',
            events: {
                click: () => console.log('click')
            }
        })
    }

    render() {
        return this.compile(template, this.props);

    }

}



export default LoginPage;


