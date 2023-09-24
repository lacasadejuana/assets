@extends('layouts.app')
<link rel="stylesheet" href="{{ asset('css/bootstrap_wizard.css?v=') . time() }}">
<link rel="stylesheet" href="{{ asset('js/mentions/jquery.mentionsInput.css') }}">
<link rel="stylesheet" href="{{ asset('css/dataTables/dataTables.bootstrap5.min.css') }}">

@section('content')
    <x-alert title="" />
    <br>
    <div class="row">
        <div class="col-md-12">
            <div class="card-style-3 mb-30">
                <h2>Enviar correo</h2>
                <form action="{{ url('plantillas_correos/send_email') }}" method="post" enctype="multipart/form-data"
                    class="form-2 row g-3 mt-2">
                    @csrf
                    <hr>
                    <div class="col-md-12">
                        <label for="name">Para</label>
                        {{-- <input class="select2-search__field" type="search" tabindex="0" autocorrect="off"
                            autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list"
                            autocomplete="off" aria-label="Search" aria-controls="select2-buscador-results"> --}}
                        <select name="buscador_persona[]" multiple id="buscador" data-placeholder="Buscar Persona"
                            class="select2-busqueda form-control"></select>
                        <br>
                        <input type="email" placeholder="Otros Correos" name="email" id="email"
                            class="form-control {{ !$errors->has('email') ?: 'is-invalid' }}" value="{{ $solicitud_visita->solicitante->email ?? '' }}">
                    </div>
                    <div class="col-md-12">
                        <label for="name">Título</label>
                        <input type="text" placeholder="Nombre" name="name" id="name"
                            class="form-control {{ !$errors->has('name') ?: 'is-invalid' }}"
                            value="{{ $plantillas_correos->name }}">
                    </div>
                    <div class="col-md-12">
                        <label for="permisos">Asunto</label>
                        {{-- <input type="text" placeholder="Asunto" name="subject" id="asunto"
                            class="form-control {{ !$errors->has('asunto') ?: 'is-invalid' }}"
                            value="{!! replaceTags($plantillas_correos->subject, $negocio) !!}"> --}}
                        <textarea name="subject" id="subject" rows="1">
                            {!! replaceTags($plantillas_correos->subject, $negocio) !!}
                        </textarea>
                    </div>
                    <div class="col-md-12">
                        <label for="permisos">Cuerpo</label>
                        <textarea name="body" id="editor1" rows="10" cols="80">
                            {!! replaceTags($plantillas_correos->body, $negocio) !!}
                        </textarea>
                    </div>
                    {{-- attach files: --}}
                    <div class="col-md-12">
                        <label for="permisos">Adjuntar Archivos <button type="button" onclick="showFiles();"
                                class="btn btn-primary btn-xs ml-5" id="add_file">Adjuntar de este negocio</button></label>
                        <div class="input-group">
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="inputGroupFile04"
                                    aria-describedby="inputGroupFileAddon04" name="files[]" multiple>
                                <label class="custom-file-label" for="inputGroupFile04">Seleccionar
                                    Archivos</label>
                            </div>
                        </div>
                    </div>

                    <br>
                    <input type="hidden" name="id_plantilla_correo" value="{{ $plantillas_correos->id }}">
                    <input type="hidden" name="id_negocio" value="{{ $negocio }}">
                    <input type="hidden" name="id_solicitud_visita" value="{{ request()->solicitud_visita ?? null }}">
                    <button type="submit" class="btn col-md-5 btn-primary" id="btn_vincular">Enviar Correo</button>
                    <div class="col-md-2" style="text-align: center"></div>
                    @if (request()->solicitud_visita)
                        <button type="button" class="btn col-md-5 btn-success" id="btn_vincular" onclick="sendWhatsApp();">
                            Enviar WhatsApp</button>
                    @endif
                    {{-- modal files --}}
                    <div class="modal fade" id="modal_files" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Archivos</h5>
                                    <button type="button" class="btn-close float-end flex" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body" id="modal-files-body">
                                    <table id="dt-files" class="table-files table table-hover" style="width: 100%">
                                    </table>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>

    </div>
@endsection
@push('js')
    <script type="text/javascript" src="{{ asset('js/ckeditor/ckeditor.js') }}"></script>
    <script type="text/javascript" src="{{ asset('js/moment/moment.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('js/mentions/lib/jquery.events.input.js') }}"></script>
    <script type="text/javascript" src="{{ asset('js/mentions/lib/jquery.elastic.js') }}"></script>
    <script type="text/javascript" src="{{ asset('js/mentions/jquery.mentionsInput.js') }}"></script>
    <script src="{{ asset('js/dataTables/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('js/dataTables/dataTables.bootstrap5.min.js') }}"></script>
    <script>
        CKEDITOR.replace('subject', {
            extraPlugins: 'mentions',
            // no show toolbar:
            toolbar: [],
            height: 35,
            // no footer:
            removePlugins: 'elementspath',
            // no resize:
            resize_enabled: false,
            // no padding:
            // bodyStyle: 'padding: 0px 0px 0px 0px;',
            // no margin:
            contentsCss: 'body {margin: 0px; padding: 0px 0px 0px 0px;};',

            mentions: [{
                feed: @json($campos_busqueda->pluck('slug_name')),
                minChars: 0,
            }]
        });

        CKEDITOR.replace('editor1', {
            extraPlugins: 'mentions',
            mentions: [{
                feed: @json($campos_busqueda->pluck('slug_name')),
                minChars: 0,
            }]
        });
    </script>
    @php
        $solicitud_visita = $solicitud_visita ?? null;
    @endphp
    <script>
        function showFiles() {
            // get files ajax:
            // $.ajax({
            //     url: "{{ url('negocio/get_files_list/') }}"+ @json($negocio),
            //     type: "GET",
            //     success: function (data) {
            //         $('#modal-files-body').html(data);
            //         $('#modal_files').modal('show');
            //     },
            //     error: function (data) {
            //         console.log('Error:', data);
            //     }
            // });
            $('#modal_files').modal('show');
        }

        $(document).ready(function() {

            $('select.select2-busqueda').select2({
                // width: '100%',
                theme: "bootstrap",
                minimumInputLength: 3,
                ajax: {
                    delay: 250,
                    url: function(params) {
                        return '/persona/searchByNameAndNegocio?negocio_id=' + @json($negocio);
                    },
                    dataType: 'json',
                }
            });

            $('.select2 ').click(function() {
                $('.select2-search__field').removeAttr('hidden');
            });


            // datatable files:
            $('#dt-files').DataTable({
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json"
                },
                "processing": true,
                // "serverSide": true,
                "ajax": {
                    "url": "{{ url('negocio/get_files_list/') }}/" + @json($negocio),
                    "type": "GET"
                },
                "columns": [
                    // checkbox:
                    {
                        "data": "id",
                        "render": function(data, type, row, meta) {
                            console.log(row.folder);
                            var subf = row.subfolder != null ? row.subfolder + '/' : '';
                            var path = 'negocios/' + @json($negocio) + '/' + row
                                .folder + '/' + subf + row.fileName;
                            return '<input type="checkbox" name="negocio-files[]" value="' + path +
                                '">';
                        }
                    },
                    {
                        data: 'date',
                        name: 'date',
                        title: 'Fecha'
                    },
                    {
                        data: 'folder',
                        name: 'folder',
                        title: 'folder'
                    },
                    {
                        data: 'fileName',
                        name: 'fileName',
                        title: 'Archivo'
                    },
                ],
                "width": "100%",
            });
        });

    function sendWhatsApp() {
        // generate message and wsp link:
        var message = CKEDITOR.instances.editor1.getData();
        // transform to text:
        var div = document.createElement("div");
        div.innerHTML = message;
        message = div.textContent || div.innerText || "";
        // keep break lines to send message:

        // convert to url:
        message = encodeURI(message);
        // params array:
        var params = {
            'phone': @json('569' . $solicitud_visita?->solicitante->telefono ?? ''),
            'text': message,
        };
        // params string:
        var params_string = Object.keys(params).map(function(key) {
            return key + '=' + params[key]
        }).join('&');
        // link:
        var link = 'https://api.whatsapp.com/send?' + params_string;

        // var link = 'https://api.whatsapp.com/send?phone=569' + @json($solicitud_visita->solicitante->telefono ?? '') + '&text=' + message;
        console.log(link);

        // record log:
        $.ajax({
            url: "{{ url('plantillas_correos/new_log') }}",
            type: "POST",
            data: {
                'id_negocio': @json($negocio),
                'id_plantilla_correo': @json($plantillas_correos->id ?? ''),
                'id_solicitud_visita': @json(request()->solicitud_visita ?? ''),
                'log': 'Se envió mensaje de WhatsApp a ' + @json($solicitud_visita?->solicitante->nombre ?? '') + ' con el mensaje: ' + message,
                _token: '{{ csrf_token() }}',
            },
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.log('Error:', data);
            }
        });
        // open link:
        window.open(link, '_blank');

    }
    </script>
@endpush
