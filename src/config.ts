import ps = require('./style');
import api = require('./api');

export class PlockConfig
{
	private fixsize: boolean;
	private size: number;
	private style: ps.PlockStyle; // Plock base style. Class name is "PlockStyle".

	private server: api.PlockAPI;

	private area: HTMLElement; // Plocks area.
	private overlay: HTMLElement; // Plocks overray area.
	private plist: HTMLElement; // Plocks overray area.

	constructor( areaId:string, conf: any = {} )
	{
		this.area = document.getElementById( areaId );
		this.addOverlay();
		this.addPlockListArea();

		this.fixsize = !!conf.fix;
		this.size = parseInt( conf.size ) || 200;

		// Style
		this.style = new ps.PlockStyle( this, <CSSStyleSheet>document.styleSheets[ 0 ] );

		// Server
		this.server = new api.PlockAPI( conf.server );
	}

	public isFixedPlockSize(): boolean { return this.fixsize; }
	public getPlockSize(): number { return this.size; }

	public getPlocksArea(): HTMLElement { return this.area; }
	public getOverray(): HTMLElement { return this.overlay; }
	public getPlockList(): HTMLElement { return this.plist; }

	public getServer(): api.PlockAPI { return this.server; }

	private addOverlay()
	{
		this.overlay = document.createElement( 'div' );
		this.overlay.classList.add( 'PlockOvelay' );
		this.area.appendChild( this.overlay );
	}

	private addPlockListArea()
	{
		this.plist = document.createElement( 'ul' );
		this.plist.classList.add( 'PlockStyleList' );
		this.area.appendChild( this.plist );
	}
}
