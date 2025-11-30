# UsersApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**usersGet**](#usersget) | **GET** /users | Get all users|
|[**usersIdDelete**](#usersiddelete) | **DELETE** /users/{id} | Delete a user|
|[**usersIdFriendsGet**](#usersidfriendsget) | **GET** /users/{id}/friends | Get friends for a user|
|[**usersIdGet**](#usersidget) | **GET** /users/{id} | Get a user by ID|
|[**usersIdMutualOtherIdGet**](#usersidmutualotheridget) | **GET** /users/{id}/mutual/{otherId} | Get mutual friends between two users|
|[**usersIdPasswordPut**](#usersidpasswordput) | **PUT** /users/{id}/password | Update user password|
|[**usersIdPatch**](#usersidpatch) | **PATCH** /users/{id} | Update user profile (selective fields)|
|[**usersIdStatisticsGet**](#usersidstatisticsget) | **GET** /users/{id}/statistics | Get a user\&#39;s statistics|
|[**usersIdStatisticsPut**](#usersidstatisticsput) | **PUT** /users/{id}/statistics | Update user statistics|
|[**usersLoginPost**](#usersloginpost) | **POST** /users/login | Login user by email or username and return JWT|
|[**usersSignupPost**](#userssignuppost) | **POST** /users/signup | Register a new user|

# **usersGet**
> Array<EntityUser> usersGet()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

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
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

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
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersIdFriendsGet**
> Array<EntityUser> usersIdFriendsGet()

Get list of friends for a user (accepted requests)

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let id: string; //User ID (default to undefined)

const { status, data } = await apiInstance.usersIdFriendsGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | User ID | defaults to undefined|


### Return type

**Array<EntityUser>**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersIdGet**
> EntityUser usersIdGet()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

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

# **usersIdMutualOtherIdGet**
> Array<EntityUser> usersIdMutualOtherIdGet()

Get list of mutual friends between userA and userB

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let id: string; //User A ID (default to undefined)
let otherId: string; //User B ID (default to undefined)

const { status, data } = await apiInstance.usersIdMutualOtherIdGet(
    id,
    otherId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | User A ID | defaults to undefined|
| **otherId** | [**string**] | User B ID | defaults to undefined|


### Return type

**Array<EntityUser>**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersIdPasswordPut**
> { [key: string]: string; } usersIdPasswordPut(request)


### Example

```typescript
import {
    UsersApi,
    Configuration,
    DtoUserPasswordRequestDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let id: string; //The user\'s ID (default to undefined)
let request: DtoUserPasswordRequestDTO; //The password update request

const { status, data } = await apiInstance.usersIdPasswordPut(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **DtoUserPasswordRequestDTO**| The password update request | |
| **id** | [**string**] | The user\&#39;s ID | defaults to undefined|


### Return type

**{ [key: string]: string; }**

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

# **usersIdPatch**
> DtoUserUpdateResponseDTO usersIdPatch(request)


### Example

```typescript
import {
    UsersApi,
    Configuration,
    DtoUserUpdateRequestDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let id: string; //The user\'s ID (default to undefined)
let request: DtoUserUpdateRequestDTO; //The user profile update (all fields optional)

const { status, data } = await apiInstance.usersIdPatch(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **DtoUserUpdateRequestDTO**| The user profile update (all fields optional) | |
| **id** | [**string**] | The user\&#39;s ID | defaults to undefined|


### Return type

**DtoUserUpdateResponseDTO**

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
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersIdStatisticsGet**
> DtoStatisticsResponse usersIdStatisticsGet()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let id: string; //The user\'s ID (default to undefined)

const { status, data } = await apiInstance.usersIdStatisticsGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | The user\&#39;s ID | defaults to undefined|


### Return type

**DtoStatisticsResponse**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**401** | Unauthorized |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersIdStatisticsPut**
> DtoStatisticsResponse usersIdStatisticsPut(request)


### Example

```typescript
import {
    UsersApi,
    Configuration,
    DtoUpdateStatisticsRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

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

**DtoStatisticsResponse**

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
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersLoginPost**
> DtoLoginResponse usersLoginPost(request)

Accepts either `email` or `username` along with `password`. Returns an access token and the full user (without password).

### Example

```typescript
import {
    UsersApi,
    Configuration,
    DtoLoginRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

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
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersSignupPost**
> DtoSignUpUserResponse usersSignupPost(request)


### Example

```typescript
import {
    UsersApi,
    Configuration,
    DtoSignUpUserRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

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
|**409** | Conflict |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

