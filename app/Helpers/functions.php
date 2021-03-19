<?php


//? This is for custom Error/Success message

function dataToResponse($type, $message, $subMessage, $complete, $status, $data = null)
{
    return response()->json(
        [
            'type' => $type, // type of response {error, success, warning,}
            'message' => $message, // Message Headline
            'subMessage' => $subMessage, // sub messages (can be an array).
            'complete' => $complete, // true or false.
            'data' => $data // true or false.
        ],
        $status // status code {200, 404, 422...}
    );
}
