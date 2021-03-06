#ifndef GLSL_FRAGMENT_MAIN
#define GLSL_FRAGMENT_MAIN

#include "../varying/data"
#include "../varying/read"

void InitVarying(inout VaryingData varyingData);
void BeforeMain(inout vec4 fragColor, inout VaryingData varyingData);
void Main(inout vec4 fragColor, inout VaryingData data);
void TransformMain(inout vec4 fragColor, inout VaryingData varyingData);
void AfterMain(inout vec4 fragColor, inout VaryingData varyingData);

void main() {
  VaryingData varyingData = ReadVaryingData();
  InitVarying(varyingData);
  BeforeMain(gl_FragColor, varyingData);
  Main(gl_FragColor, varyingData);
  TransformMain(gl_FragColor, varyingData);
  AfterMain(gl_FragColor, varyingData);
}

#ifdef GLSL_FRAGMENT_MAIN_BEFORE
  void GLSL_FRAGMENT_MAIN_BEFORE(inout vec4 fragColor,
                                 inout VaryingData varyingData);
#endif

#ifdef GLSL_FRAGMENT_MAIN_TRANSFORM
  void GLSL_FRAGMENT_MAIN_TRANSFORM(inout vec4 fragColor,
                                    inout VaryingData varyingData);
#endif

#ifdef GLSL_FRAGMENT_MAIN_AFTER
  void GLSL_FRAGMENT_MAIN_AFTER(inout vec4 fragColor,
                                inout VaryingData varyingData);
#endif

void BeforeMain(inout vec4 fragColor,
                inout VaryingData varyingData) {
#ifdef GLSL_FRAGMENT_MAIN_BEFORE
  GLSL_FRAGMENT_MAIN_BEFORE(fragColor, varyingData);
#endif
}

void TransformMain(inout vec4 fragColor,
                   inout VaryingData varyingData) {
#ifdef GLSL_FRAGMENT_MAIN_TRANSFORM
  GLSL_FRAGMENT_MAIN_TRANSFORM(fragColor, varyingData);
#endif
}

void AfterMain(inout vec4 fragColor,
               inout VaryingData varyingData) {
#ifdef GLSL_FRAGMENT_MAIN_AFTER
  GLSL_FRAGMENT_MAIN_AFTER(fragColor, varyingData);
#endif
}

void InitVarying(inout VaryingData varyingData) {
  varyingData = ReadVaryingData();
}

#endif
