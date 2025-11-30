# TeamsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**teamsGet**](#teamsget) | **GET** /teams | Get teams with optional filtering|
|[**teamsIdDelete**](#teamsiddelete) | **DELETE** /teams/{id} | Delete a team|
|[**teamsIdGet**](#teamsidget) | **GET** /teams/{id} | Get a team by ID|
|[**teamsIdPut**](#teamsidput) | **PUT** /teams/{id} | Update a team|
|[**teamsPost**](#teamspost) | **POST** /teams | Create a new team|
|[**teamsUsersDelete**](#teamsusersdelete) | **DELETE** /teams/users | Delete a user from a team|
|[**teamsUsersPut**](#teamsusersput) | **PUT** /teams/users | Add a user to a team|

# **teamsGet**
> Array<EntityTeam> teamsGet()

Get teams - all teams, by name, or by prefix with limit

### Example

```typescript
import {
    TeamsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let name: string; //Filter by exact name (optional) (default to undefined)
let prefix: string; //Filter by name prefix (optional) (default to undefined)
let limit: number; //Limit results (required with prefix) (optional) (default to undefined)

const { status, data } = await apiInstance.teamsGet(
    name,
    prefix,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **name** | [**string**] | Filter by exact name | (optional) defaults to undefined|
| **prefix** | [**string**] | Filter by name prefix | (optional) defaults to undefined|
| **limit** | [**number**] | Limit results (required with prefix) | (optional) defaults to undefined|


### Return type

**Array<EntityTeam>**

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
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **teamsIdDelete**
> { [key: string]: any; } teamsIdDelete()

Delete a team by providing team ID

### Example

```typescript
import {
    TeamsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let id: string; //Team ID (default to undefined)

const { status, data } = await apiInstance.teamsIdDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Team ID | defaults to undefined|


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
|**200** | Team deleted |  -  |
|**400** | Bad Request: Missing team ID |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **teamsIdGet**
> EntityTeam teamsIdGet()

Get team details by ID

### Example

```typescript
import {
    TeamsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let id: string; //Team ID (default to undefined)

const { status, data } = await apiInstance.teamsIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Team ID | defaults to undefined|


### Return type

**EntityTeam**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**404** | Team not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **teamsIdPut**
> EntityTeam teamsIdPut(team)

Update team details by providing team ID and updated details

### Example

```typescript
import {
    TeamsApi,
    Configuration,
    EntityTeam
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let id: string; //Team ID (default to undefined)
let team: EntityTeam; //Updated team details

const { status, data } = await apiInstance.teamsIdPut(
    id,
    team
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **team** | **EntityTeam**| Updated team details | |
| **id** | [**string**] | Team ID | defaults to undefined|


### Return type

**EntityTeam**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **teamsPost**
> EntityTeam teamsPost(request)

Create a new team with the provided details

### Example

```typescript
import {
    TeamsApi,
    Configuration,
    DtoTeamRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let request: DtoTeamRequest; //Team details

const { status, data } = await apiInstance.teamsPost(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **DtoTeamRequest**| Team details | |


### Return type

**EntityTeam**

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
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **teamsUsersDelete**
> { [key: string]: any; } teamsUsersDelete(request)

Delete a user from a team by providing team ID

### Example

```typescript
import {
    TeamsApi,
    Configuration,
    DtoUserToTeamRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let request: DtoUserToTeamRequest; //User ID and Team ID

const { status, data } = await apiInstance.teamsUsersDelete(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **DtoUserToTeamRequest**| User ID and Team ID | |


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
|**200** | User deleted from team |  -  |
|**400** | Bad Request: Invalid request body or missing userId or teamId |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **teamsUsersPut**
> { [key: string]: any; } teamsUsersPut(request)

Add a user to a team by providing user ID and team ID

### Example

```typescript
import {
    TeamsApi,
    Configuration,
    DtoUserToTeamRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let request: DtoUserToTeamRequest; //User ID and Team ID

const { status, data } = await apiInstance.teamsUsersPut(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **DtoUserToTeamRequest**| User ID and Team ID | |


### Return type

**{ [key: string]: any; }**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User added to team |  -  |
|**400** | Bad Request: Invalid request body or missing userId or teamId |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

