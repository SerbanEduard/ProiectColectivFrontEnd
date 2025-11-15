# DefaultApi

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
|[**usersGet**](#usersget) | **GET** /users | Get all users|
|[**usersIdDelete**](#usersiddelete) | **DELETE** /users/{id} | Delete a user|
|[**usersIdGet**](#usersidget) | **GET** /users/{id} | Get a user by ID|
|[**usersIdPut**](#usersidput) | **PUT** /users/{id} | Update a user|
|[**usersIdStatisticsPut**](#usersidstatisticsput) | **PUT** /users/{id}/statistics | Update user statistics|
|[**usersLoginPost**](#usersloginpost) | **POST** /users/login | Login user by email or username and return JWT|
|[**usersSignupPost**](#userssignuppost) | **POST** /users/signup | Register a new user|
|[**voiceTeamIdGet**](#voiceteamidget) | **GET** /voice/{teamId} | Join voice chat room|
|[**voiceTeamIdLeaveDelete**](#voiceteamidleavedelete) | **DELETE** /voice/{teamId}/leave | Leave voice chat room|

# **teamsGet**
> Array<EntityTeam> teamsGet()

Get teams - all teams, by name, or by prefix with limit

### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

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
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

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
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

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
    DefaultApi,
    Configuration,
    EntityTeam
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

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
    DefaultApi,
    Configuration,
    DtoTeamRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

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
    DefaultApi,
    Configuration,
    DtoUserToTeamRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

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
    DefaultApi,
    Configuration,
    DtoUserToTeamRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

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

# **usersGet**
> Array<EntityUser> usersGet()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.usersGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<EntityUser>**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersIdDelete**
> { [key: string]: string; } usersIdDelete()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let id: string; //The user\'s ID (default to undefined)

const { status, data } = await apiInstance.usersIdDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | The user\&#39;s ID | defaults to undefined|


### Return type

**{ [key: string]: string; }**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersIdGet**
> EntityUser usersIdGet()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let id: string; //The user\'s ID (default to undefined)

const { status, data } = await apiInstance.usersIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | The user\&#39;s ID | defaults to undefined|


### Return type

**EntityUser**

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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersIdPut**
> EntityUser usersIdPut(user)


### Example

```typescript
import {
    DefaultApi,
    Configuration,
    EntityUser
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let id: string; //The user\'s ID (default to undefined)
let user: EntityUser; //The updated user

const { status, data } = await apiInstance.usersIdPut(
    id,
    user
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **user** | **EntityUser**| The updated user | |
| **id** | [**string**] | The user\&#39;s ID | defaults to undefined|


### Return type

**EntityUser**

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
|**404** | User not found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersIdStatisticsPut**
> DtoUpdateStatisticsResponse usersIdStatisticsPut(request)


### Example

```typescript
import {
    DefaultApi,
    Configuration,
    DtoUpdateStatisticsRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let id: string; //The user\'s ID (default to undefined)
let request: DtoUpdateStatisticsRequest; //The statistics update request

const { status, data } = await apiInstance.usersIdStatisticsPut(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **DtoUpdateStatisticsRequest**| The statistics update request | |
| **id** | [**string**] | The user\&#39;s ID | defaults to undefined|


### Return type

**DtoUpdateStatisticsResponse**

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
|**401** | Unauthorized |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersLoginPost**
> DtoLoginResponse usersLoginPost(request)

Accepts either `email` or `username` along with `password`. Returns an access token and the full user (without password).

### Example

```typescript
import {
    DefaultApi,
    Configuration,
    DtoLoginRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let request: DtoLoginRequest; //The login request (email or username + password)

const { status, data } = await apiInstance.usersLoginPost(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **DtoLoginRequest**| The login request (email or username + password) | |


### Return type

**DtoLoginResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersSignupPost**
> DtoSignUpUserResponse usersSignupPost(request)


### Example

```typescript
import {
    DefaultApi,
    Configuration,
    DtoSignUpUserRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let request: DtoSignUpUserRequest; //The sign-up request

const { status, data } = await apiInstance.usersSignupPost(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **DtoSignUpUserRequest**| The sign-up request | |


### Return type

**DtoSignUpUserResponse**

### Authorization

No authorization required

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

# **voiceTeamIdGet**
> voiceTeamIdGet()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let teamId: string; //Team ID (default to undefined)
let userId: string; //User ID (default to undefined)

const { status, data } = await apiInstance.voiceTeamIdGet(
    teamId,
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **teamId** | [**string**] | Team ID | defaults to undefined|
| **userId** | [**string**] | User ID | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**101** | Switching Protocols - WebSocket connection established |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Room is full |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **voiceTeamIdLeaveDelete**
> { [key: string]: string; } voiceTeamIdLeaveDelete()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let teamId: string; //Team ID (default to undefined)
let userId: string; //User ID (default to undefined)

const { status, data } = await apiInstance.voiceTeamIdLeaveDelete(
    teamId,
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **teamId** | [**string**] | Team ID | defaults to undefined|
| **userId** | [**string**] | User ID | defaults to undefined|


### Return type

**{ [key: string]: string; }**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully left room |  -  |
|**401** | Unauthorized |  -  |
|**404** | Room not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

