# QuizzesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**quizzesIdGet**](#quizzesidget) | **GET** /quizzes/{id} | Get a quiz with answers|
|[**quizzesIdTestGet**](#quizzesidtestget) | **GET** /quizzes/{id}/test | Get a quiz without answers|
|[**quizzesIdTestPost**](#quizzesidtestpost) | **POST** /quizzes/{id}/test | Solve a quiz|
|[**quizzesPost**](#quizzespost) | **POST** /quizzes | Create a new quiz|
|[**quizzesTeamTeamIdGet**](#quizzesteamteamidget) | **GET** /quizzes/team/{teamId} | Get quizzes by team with pagination|
|[**quizzesUserUserIdTeamTeamIdGet**](#quizzesuseruseridteamteamidget) | **GET** /quizzes/user/{userId}/team/{teamId} | Get quizzes by user with pagination|

# **quizzesIdGet**
> EntityQuiz quizzesIdGet()


### Example

```typescript
import {
    QuizzesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new QuizzesApi(configuration);

let id: string; //The id for quiz (default to undefined)

const { status, data } = await apiInstance.quizzesIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | The id for quiz | defaults to undefined|


### Return type

**EntityQuiz**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **quizzesIdTestGet**
> DtoReadQuizResponse quizzesIdTestGet()


### Example

```typescript
import {
    QuizzesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new QuizzesApi(configuration);

let id: string; //The id for quiz (default to undefined)

const { status, data } = await apiInstance.quizzesIdTestGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | The id for quiz | defaults to undefined|


### Return type

**DtoReadQuizResponse**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **quizzesIdTestPost**
> DtoSolveQuizResponse quizzesIdTestPost(request)


### Example

```typescript
import {
    QuizzesApi,
    Configuration,
    DtoSolveQuizRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new QuizzesApi(configuration);

let id: string; //The id for quiz (default to undefined)
let request: DtoSolveQuizRequest; //The solve quiz request

const { status, data } = await apiInstance.quizzesIdTestPost(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **DtoSolveQuizRequest**| The solve quiz request | |
| **id** | [**string**] | The id for quiz | defaults to undefined|


### Return type

**DtoSolveQuizResponse**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **quizzesPost**
> DtoCreateQuizResponse quizzesPost(request)


### Example

```typescript
import {
    QuizzesApi,
    Configuration,
    EntityQuiz
} from './api';

const configuration = new Configuration();
const apiInstance = new QuizzesApi(configuration);

let request: EntityQuiz; //The create quiz request

const { status, data } = await apiInstance.quizzesPost(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **EntityQuiz**| The create quiz request | |


### Return type

**DtoCreateQuizResponse**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**400** | Bad Request |  -  |
|**403** | Forbidden |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **quizzesTeamTeamIdGet**
> { [key: string]: any; } quizzesTeamTeamIdGet()


### Example

```typescript
import {
    QuizzesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new QuizzesApi(configuration);

let teamId: string; //Team ID (default to undefined)
let pageSize: number; //Page size (default 10) (optional) (default to undefined)
let lastKey: string; //Last key for pagination (optional) (default to undefined)

const { status, data } = await apiInstance.quizzesTeamTeamIdGet(
    teamId,
    pageSize,
    lastKey
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **teamId** | [**string**] | Team ID | defaults to undefined|
| **pageSize** | [**number**] | Page size (default 10) | (optional) defaults to undefined|
| **lastKey** | [**string**] | Last key for pagination | (optional) defaults to undefined|


### Return type

**{ [key: string]: any; }**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **quizzesUserUserIdTeamTeamIdGet**
> { [key: string]: any; } quizzesUserUserIdTeamTeamIdGet()


### Example

```typescript
import {
    QuizzesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new QuizzesApi(configuration);

let userId: string; //User ID (default to undefined)
let teamId: string; //Team ID (default to undefined)
let pageSize: number; //Page size (default 10) (optional) (default to undefined)
let lastKey: string; //Last key for pagination (optional) (default to undefined)

const { status, data } = await apiInstance.quizzesUserUserIdTeamTeamIdGet(
    userId,
    teamId,
    pageSize,
    lastKey
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] | User ID | defaults to undefined|
| **teamId** | [**string**] | Team ID | defaults to undefined|
| **pageSize** | [**number**] | Page size (default 10) | (optional) defaults to undefined|
| **lastKey** | [**string**] | Last key for pagination | (optional) defaults to undefined|


### Return type

**{ [key: string]: any; }**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

