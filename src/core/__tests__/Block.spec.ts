import Block, { Props } from '../Block';

class TestBlock extends Block {
	constructor(props: Props) {
		super({
			...props,
		});

		this.props = {
			start: 'baseProp',
		};
	}

	render() {
		// language=hbs
		return '<div id="test">template</div>';
	}
}

const testComponent = new TestBlock({});

describe('Тестирование базового класса Block:', () => {
	it('должен иметь публичный id ', () => {
		const result = typeof testComponent.id;

		expect(result).toBe('string');
	});

	it('не должен возвращать null|undefined', () => {
		const result = testComponent.element;

		expect(result !== null && result !== undefined);
	});

	it('должен возвращать разметку', () => {
		expect(testComponent.render()).toStrictEqual('<div id="test">template</div>');
	});

	it('должен уметь прокидывать пропсы', () => {
		testComponent.setProps({ added: 'testProp' });
		const result = testComponent.getProps();

		expect(result).toHaveProperty('start');
		expect(result).toHaveProperty('added');
	});

	it('должен уметь прокидывать пропсы', () => {
		testComponent.setProps({ added: 'testProp' });
		const result = testComponent.getProps();

		expect(result).toHaveProperty('start');
		expect(result).toHaveProperty('added');
	});

	it('проверка метода .hide()', () => {
		testComponent.hide();
		const element = testComponent.getContent();
		const result = element?.style.display;

		expect(result).toStrictEqual('none');
	});

	it('проверка метода .show()', () => {
		testComponent.show();
		const element = testComponent.getContent();
		const result = element?.style.display;

		expect(result).toStrictEqual('block');
	});
});
