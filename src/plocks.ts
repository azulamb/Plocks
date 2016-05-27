import p = require( './plock' );
import pc = require( './config' );

export class Plocks
{
	static create( areaId: string, conf: any = {} ): Plocks
	{
		return new Plocks( areaId, conf);
	}

	private config: pc.PlockConfig;
	private list: p.Plock[];

	constructor( areaId: string, mdparser: ( string ) => string, conf: any = {} )
	{
		this.config = new pc.PlockConfig( areaId, conf );
		this.list = new Array<p.Plock>();

		this.config.getServer().getList( { page: 0 },
			() => { this.render(); },
			() => {});
	}

	public push( content: string )
	{
		this.list.push( p.Plock.create( content ) );
	}

	public render()
	{
		const area: HTMLElement = this.config.getPlockList();
		for (let i = 0 ; i < this.list.length ; ++i )
		{
			area.appendChild( this.list[ i ].render() );
		}
	}
}
