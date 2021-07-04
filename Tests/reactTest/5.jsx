/**
 * Two paragraph element will be shown first with text 1 and second with text 2 because first p tag is not wrapped inside a provider which means it uses the default value of the context but the second p tag is wrapped around a provider which uses the value attribute as the context value, which is 2 in this case.
 */