# MessagesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**messagesConnectGet**](#messagesconnectget) | **GET** /messages/connect | Connect the user to the message WebSocket|
|[**messagesGet**](#messagesget) | **GET** /messages | Get all messages|
|[**messagesIdGet**](#messagesidget) | **GET** /messages/{id} | Get a message by ID|
|[**messagesPost**](#messagespost) | **POST** /messages | Create and send a message|

# **messagesConnectGet**
> messagesConnectGet()


### Example

```typescript
import {
    MessagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MessagesApi(configuration);

const { status, data } = await apiInstance.messagesConnectGet();
```

### Parameters
This endpoint does not have any parameters.


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
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **messagesGet**
> Array<DtoMessageDTO> messagesGet()

Get messages between 2 users or within a team

### Example

```typescript
import {
    MessagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MessagesApi(configuration);

let type: string; //Messages type (direct/team) (default to undefined)
let user1Id: string; //User1 ID (direct message) (optional) (default to undefined)
let user2Id: string; //User2 ID (direct message) (optional) (default to undefined)
let teamId: string; //Team ID (team message) (optional) (default to undefined)

const { status, data } = await apiInstance.messagesGet(
    type,
    user1Id,
    user2Id,
    teamId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **type** | [**string**] | Messages type (direct/team) | defaults to undefined|
| **user1Id** | [**string**] | User1 ID (direct message) | (optional) defaults to undefined|
| **user2Id** | [**string**] | User2 ID (direct message) | (optional) defaults to undefined|
| **teamId** | [**string**] | Team ID (team message) | (optional) defaults to undefined|


### Return type

**Array<DtoMessageDTO>**

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

# **messagesIdGet**
> DtoMessageDTO messagesIdGet()


### Example

```typescript
import {
    MessagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MessagesApi(configuration);

let id: string; //The message ID (default to undefined)

const { status, data } = await apiInstance.messagesIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | The message ID | defaults to undefined|


### Return type

**DtoMessageDTO**

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

# **messagesPost**
> DtoMessageDTO messagesPost(request)

Create and send a message either to another user or to a team

### Example

```typescript
import {
    MessagesApi,
    Configuration,
    ControllerMessageRequestUnion
} from './api';

const configuration = new Configuration();
const apiInstance = new MessagesApi(configuration);

let type: string; //Message type (direct/team) (default to undefined)
let request: ControllerMessageRequestUnion; //The message request (this is only for documentation purposes, the actual request should be either DirectMessageRequest or TeamMessageRequest)

const { status, data } = await apiInstance.messagesPost(
    type,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ControllerMessageRequestUnion**| The message request (this is only for documentation purposes, the actual request should be either DirectMessageRequest or TeamMessageRequest) | |
| **type** | [**string**] | Message type (direct/team) | defaults to undefined|


### Return type

**DtoMessageDTO**

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

