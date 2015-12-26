export class PlockConfig {
	private fixsize: boolean;
	private size: number;
	constructor( conf: any = {} )
	{
		this.fixsize = !!conf.fix;
		this.size = parseInt( conf.size ) || 200;
	}
	public isFixedPlockSize(): boolean { return this.fixsize; }
	public getPlockSize(): number { return this.size; }
}
