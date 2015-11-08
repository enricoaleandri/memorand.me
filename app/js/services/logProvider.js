/**
 * @ngdoc overview
 * @name memorand.me.loggerModule
 * @description Angular Module containing all validation directives.
 */
angular.module('memorand.me.loggerModule', [])
	.provider('logger', function() {
		// In the provider function, you cannot inject any
		// service or factory. This can only be done at the
		// "$get" method.


		function CustomApplicationLayout(LO) {
			this.loggerObject = LO ;
		}
		CustomApplicationLayout.prototype = new log4javascript.Layout();

		CustomApplicationLayout.prototype.format = function(loggingEvent) {

			var obj = {
				messages : loggingEvent.messages,
				logLevel : loggingEvent.level.name
			}
			return angular.toJson(obj);
		};
		CustomApplicationLayout.prototype.ignoresThrowable = function() {return false;};
		CustomApplicationLayout.prototype.toString = function() {return "CustomApplicationLogLayout";};
		// Disable batching
		CustomApplicationLayout.prototype.allowBatching = function() { return false;};
		CustomApplicationLayout.prototype.getContentType = function() {return "application/json"; };




		function CustomTraceLayout(LO) {this.loggerObject = LO ;}
		CustomTraceLayout.prototype = new log4javascript.Layout();

		CustomTraceLayout.prototype.format = function(loggingEvent) {
			return angular.toJson(loggingEvent.messages[0]);
		};

		CustomTraceLayout.prototype.toString = function() {return "CustomTraceLayout";};
		// Disable batching
		CustomTraceLayout.prototype.allowBatching = function() { return false;};
		CustomTraceLayout.prototype.getContentType = function() {return "application/json"; };


		this.$get = [ "configService", "$log" ,
			function( configService, $log ) {

				var log = undefined;
				var logTrace = undefined;
				var doConfig = undefined;

				var techInput = {};


				var doConfig = function (config,doLog)
				{
					var loggerObject = {};
					if(doConfig === undefined)
					{
						try {

							/**
							 * Performing Application logger  with custom appender ( it use the CustomApplicationLayout )
							 */

							log = log4javascript.getLogger("applicationLogger");
							var ajaxAppender = new log4javascript.AjaxAppender(config.endPoint + config.applicationLog.path);
							ajaxAppender.addHeader("Content-Type", "application/json");
							ajaxAppender.setThreshold(log4javascript.Level[config.applicationLog.logLevel]);
							ajaxAppender.setLayout(new CustomApplicationLayout(loggerObject));
							log.addAppender(ajaxAppender);


							/**
							 * Performing Profiling logger  with custom appender ( it use the CustomTraceLayout )
							 */
							logTrace = log4javascript.getLogger("profilingLogger");
							var ajaxAppenderTrace = new log4javascript.AjaxAppender(config.endPoint + config.performanceLog.path);
							ajaxAppenderTrace.addHeader("Content-Type", "application/json");
							ajaxAppenderTrace.setThreshold(log4javascript.Level[config.performanceLog.logLevel]);
							ajaxAppenderTrace.setLayout(new CustomTraceLayout(loggerObject));
							logTrace.addAppender(ajaxAppenderTrace);
						}
						catch(e)
						{
							console.error("Error during configuration of logger : "+e);
							log = console;
							logTrace = console;
						}
					}


					doLog(config);
				};

				var configPromise =  configService.getConfiguration('log4javascript.json');

				return {
					info : function(msg)
					{
						configPromise.then(function(config)
						{
                            doConfig(config, function(conf)
                            {
                                if(conf.applicationLog.enabled)
                                    log.info(msg);
                                if(conf.applicationLog.logLevel === "DEBUG"){$log.info(msg);}
                            })
						});
					},
					debug : function(msg)
					{
						configPromise.then(function(config)
						{
                            doConfig(config, function(conf)
                            {
                                if(conf.applicationLog.enabled)
                                    log.debug(msg);
                                if(conf.applicationLog.logLevel === "DEBUG"){$log.debug(msg);}
                            })
						});
					},
					error : function(msg)
					{
						configPromise.then(function(config)
						{
                            doConfig(config, function(conf)
                            {
                                if(conf.applicationLog.enabled)
                                    log.error(msg);
                                if(conf.applicationLog.logLevel === "DEBUG"){$log.error(msg);}
                            })
						});
					},
					warn : function(msg)
					{
						configPromise.then(function(config)
						{
                            doConfig(config, function(conf)
                            {
                                if(conf.applicationLog.enabled)
                                    log.warn(msg);
                                if(conf.applicationLog.logLevel === "DEBUG"){$log.warn(msg);}
                            })
						});
					},
					traceStart : function(serviceName, timing, callerKey)
					{
						configPromise.then(function(config)
						{
                            doConfig(config, function(conf)
                            {
                                var PayLoad = {
                                    service : serviceName,
                                    timestamp : timing,  //timestamp di inizio
                                    //callkey : callerKey, // chiave random che lega timestamp inizio
                                    type : "BEGIN"  // tipologia di timestamp, inizio, fine
                                };

                                if(conf.performanceLog.enabled)
                                    logTrace.info(PayLoad);
                            })
						});
					},
					traceEndOK : function(serviceName, timing, callerKey)
					{
						configPromise.then(function(config)
						{
                            doConfig(config, function(conf)
                            {
                                var PayLoad = {
                                    service : serviceName,
                                    timestamp : timing,  //timestamp di inizio
                                    //callkey : callerKey, // chiave random che lega timestamp inizio
                                    type : "END"  // tipologia di timestamp, inizio, fine
                                };

                                if(conf.performanceLog.enabled)
                                    logTrace.info(PayLoad);
                            });
						});
					},
					traceEndKO : function(serviceName, timing, callerKey)
					{
						configPromise.then(function(config)
						{
                            doConfig(config, function(conf)
                            {
                                var PayLoad =
                                {
                                    service : serviceName,
                                    timestamp : timing,  //timestamp di inizio
                                    //callkey : callerKey, // chiave random che lega timestamp inizio
                                    type : "END-ERROR"  // tipologia di timestamp, inizio, fine
                                };

                                if(conf.performanceLog.enabled)
                                    logTrace.info(PayLoad);
                            });
						});
					},
					traceTimeout : function(serviceName, timing, callerKey)
					{
						configPromise.then(function(config)
						{
                            doConfig(config, function(conf)
                            {
                                var PayLoad = {
                                    service : serviceName,
                                    timestamp : timing,  //timestamp di inizio
                                    //callkey : callerKey, // chiave random che lega timestamp inizio
                                    type : "END-TIMEOUT"  // tipologia di timestamp, inizio, fine
                                };
                                if(conf.performanceLog.enabled)
                                    logTrace.info(PayLoad);
                            });
						});
					}
				}

			}];

	});



