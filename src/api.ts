interface callback{ (argv: Object) :void };

export class PlockAPI
{
	private server: string;
	private list: string;

	constructor( conf: any )
	{
		this.server = conf.server || './';
		this.list   = conf.list   || 'list';
	}

	private create(): XMLHttpRequest
	{
		try{
			return new XMLHttpRequest();
		}catch( e ){}
		return null;
	}

	private createGetParams( params:Object ): string
	{
		const p = [];
		for ( let v in params )
		{
			p.push( v + '=' + encodeURIComponent( params[ v ] ) );
		}
		return 0 < p.length ? ( '?' + p.join( '&' ) ) : '';
	}

	private fetch( api: string, params: Object, success: callback, error: callback ): XMLHttpRequest
	{
		const req: XMLHttpRequest = this.create();
		if ( !req ){ return null; }
		req.onreadystatechange = () =>
		{
			if ( req.readyState === 4 )
			{
				if ( req.status === 0 ) { return error( {} ); }
				if ( !( 200 <= req.status && req.status < 300 ) || ( req.status == 304 ) ){ return error( {} ); }
				success( JSON.parse(req.responseText) );
			}
		};
		req.open( 'GET', this.server + api + this.createGetParams( params ), true );
		req.send( null );
		return req;
	}

	public getList( params: Object, success: callback, error: callback )
	{
		this.fetch( this.list, params, success, error );
	}
};
