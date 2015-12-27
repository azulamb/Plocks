export class Plock{
	static create( content: string = null, style: CSSStyleDeclaration = undefined ): Plock
	{
		return new Plock( content, style );
	}

	constructor( content: string = null, style: CSSStyleDeclaration = undefined )
	{

	}

	public render(): HTMLElement
	{
		const item = document.createElement( 'li' );
		item.classList.add( 'PlockStyle' );
		return item;
	}
}
