import pc = require('./config');

export class PlockStyle
{
	private config: pc.PlockConfig;
	private pstyle: CSSStyleDeclaration; // Plock style.

	constructor( config: pc.PlockConfig, ss: CSSStyleSheet )
	{
		this.config = config;

		this.setAreaStyle();

		// Setting Plock style.
		const a = document.getElementsByClassName( 'PlockStyle' );
		this.pstyle = undefined;

		// Setting first style.
		//this.pstyle.width = config.getPlockSize() + 'px';
		//this.pstyle.height = config.getPlockSize() + 'px';
	}

	private searchPlockStyle()
	{
		for ( let s = 0; s < document.styleSheets.length; ++s)
		{
			const r:CSSRuleList = (<CSSStyleSheet>(document.styleSheets[ s ])).rules;
			if ( !r ) { continue; }
			for (let i = 0;i<r.length ;++i )
			{
				if ( (<CSSStyleRule>r[i]).selectorText === '.PlockStyle' )
				{
					this.pstyle = (<CSSStyleRule>r[i]).style;
				}
			}
		}
	}

	private setAreaStyle()
	{
		const style: CSSStyleDeclaration = this.config.getPlocksArea().style;
		style.position = 'relative';
	}
}