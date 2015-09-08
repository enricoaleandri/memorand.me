/**
 * @author  Enrico Aleandri <aleandrienrico@gmail.com>
 * @desc    this function will be automaticly append to the angular object in dev mode,
 *          you can use it to mock your backend, to develop without a backend, or for testing.
 */

(function (ng) {
    'use strict';
	ng.module('az-direct-IT-QUOTE-all')
        .config(function($provide) {
            $provide.decorator('$httpBackend', ng.mock.e2e.$httpBackendDecorator);
        })
        .run(function($httpBackend,$http) {

			jQuery.ajax({
				url:'app/mocks/configMocks.json',
				success: function(result) {

					for(var index in result.mocks)
					{
						if(result.mocks[index].enabled)
						{
							jQuery.ajax({
								url: result.mocks[index].file,
								async: false
							}).done(function(resultMocked)
							{
								if (resultMocked) {
									$httpBackend["when" + result.mocks[index].method](new RegExp(result.mocks[index].match)).respond(resultMocked);
									console.log(result.mocks[index].file + " moked up.");
								}
							}).error(function(ErrorMocked)
							{
								if (ErrorMocked.responseText) {
									$httpBackend["when" + result.mocks[index].method](new RegExp(result.mocks[index].match)).respond(ErrorMocked.responseText);
									console.log(result.mocks[index].file + " moked up.");
								}
							});
						}
					}
				},
				async:   false
			});

            // you need to pass through all not mocked rest calls, otherwise you will get a error
			$httpBackend.whenGET(/.*/).passThrough();
            $httpBackend.whenPOST(/.*/).passThrough();
            $httpBackend.whenDELETE(/.*/).passThrough();
            $httpBackend.whenPUT(/.*/).passThrough();
        });
})(angular);


