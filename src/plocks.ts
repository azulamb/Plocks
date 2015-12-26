import p = require( './plock' );
import pc = require( './config' );

export class Plocks
 {
	static create( areaId: string, conf: any = {} ): Plocks
	{
		return new Plocks( areaId, conf);
	}

	private config: pc.PlockConfig;
	private area: HTMLElement;

	constructor( areaId: string, conf: any = {} )
	{
		this.area = document.getElementById( areaId );
		this.setConfig( conf );
	}

	public setConfig( conf: any )
	{
		this.config = new pc.PlockConfig( conf );
	}
}
