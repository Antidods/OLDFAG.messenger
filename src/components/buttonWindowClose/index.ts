import Block, {Props} from '../../utils/Block';
import template from "./template.hbs";


export class Button extends Block {
    constructor(props: Props) {
        super(props ); //после пропса можно добавить тэг для обёртки
    }

    render() {
        return this.compile(template, this.props);
    }
}
