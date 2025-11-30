# VoiceApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**voiceJoinRoomIdGet**](#voicejoinroomidget) | **GET** /voice/join/{roomId} | Join a voice room via WebSocket|
|[**voiceJoinableGet**](#voicejoinableget) | **GET** /voice/joinable | Get joinable voice rooms|
|[**voicePrivateCallPost**](#voiceprivatecallpost) | **POST** /voice/private/call | Start a private voice call|
|[**voiceRoomsTeamIdGet**](#voiceroomsteamidget) | **GET** /voice/rooms/{teamId} | Get active voice rooms for a team|
|[**voiceRoomsTeamIdPost**](#voiceroomsteamidpost) | **POST** /voice/rooms/{teamId} | Create a group voice room|

# **voiceJoinRoomIdGet**
> voiceJoinRoomIdGet()

Establishes a WebSocket connection for voice communication in a room

### Example

```typescript
import {
    VoiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VoiceApi(configuration);

let roomId: string; //Room ID to join (default to undefined)
let userId: string; //User ID joining the room (default to undefined)

const { status, data } = await apiInstance.voiceJoinRoomIdGet(
    roomId,
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **roomId** | [**string**] | Room ID to join | defaults to undefined|
| **userId** | [**string**] | User ID joining the room | defaults to undefined|


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
|**101** | Switching Protocols |  -  |
|**400** | Bad Request |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **voiceJoinableGet**
> Array<ControllerRoomResponse> voiceJoinableGet()

Returns all group and private rooms that the user is authorized to join and are not full

### Example

```typescript
import {
    VoiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VoiceApi(configuration);

let userId: string; //User ID of the client (default to undefined)

const { status, data } = await apiInstance.voiceJoinableGet(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] | User ID of the client | defaults to undefined|


### Return type

**Array<ControllerRoomResponse>**

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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **voicePrivateCallPost**
> EntityVoiceRoom voicePrivateCallPost()

Creates a private voice room for two users with restricted access

### Example

```typescript
import {
    VoiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VoiceApi(configuration);

let callerId: string; //ID of the user initiating the call (default to undefined)
let targetId: string; //ID of the user being called (default to undefined)
let teamId: string; //Team ID for context (optional) (default to undefined)

const { status, data } = await apiInstance.voicePrivateCallPost(
    callerId,
    targetId,
    teamId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **callerId** | [**string**] | ID of the user initiating the call | defaults to undefined|
| **targetId** | [**string**] | ID of the user being called | defaults to undefined|
| **teamId** | [**string**] | Team ID for context | (optional) defaults to undefined|


### Return type

**EntityVoiceRoom**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **voiceRoomsTeamIdGet**
> Array<ControllerRoomResponse> voiceRoomsTeamIdGet()

Returns all group voice rooms belonging to a specific team

### Example

```typescript
import {
    VoiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VoiceApi(configuration);

let teamId: string; //Team ID (default to undefined)

const { status, data } = await apiInstance.voiceRoomsTeamIdGet(
    teamId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **teamId** | [**string**] | Team ID | defaults to undefined|


### Return type

**Array<ControllerRoomResponse>**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **voiceRoomsTeamIdPost**
> EntityVoiceRoom voiceRoomsTeamIdPost()

Creates a new voice room for team members

### Example

```typescript
import {
    VoiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VoiceApi(configuration);

let teamId: string; //Team ID (default to undefined)
let userId: string; //User ID of the creator (default to undefined)
let name: string; //Room name (optional) (optional) (default to undefined)

const { status, data } = await apiInstance.voiceRoomsTeamIdPost(
    teamId,
    userId,
    name
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **teamId** | [**string**] | Team ID | defaults to undefined|
| **userId** | [**string**] | User ID of the creator | defaults to undefined|
| **name** | [**string**] | Room name (optional) | (optional) defaults to undefined|


### Return type

**EntityVoiceRoom**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**409** | Conflict |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

