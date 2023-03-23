"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
exports.PatientsService = void 0;
var common_1 = require("@nestjs/common");
var prisma_config_1 = require("src/prisma/prisma.config");
var getDtos_1 = require("src/utils/getDtos");
var csv_parse_1 = require("csv-parse");
var csv_parser_1 = require("csv-parser");
var PatientsService = /** @class */ (function () {
    function PatientsService(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
        this.logger = new common_1.Logger(PatientsService_1.name);
    }
    PatientsService_1 = PatientsService;
    PatientsService.prototype.customParser = function () {
        return csv_parser_1["default"]({
            mapHeaders: function (_a) {
                var header = _a.header;
                return header.trim();
            },
            mapValues: function (_a) {
                var value = _a.value;
                return (value === '' ? null : value.trim());
            }
        });
    };
    PatientsService.prototype.parseFile = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                csv_parse_1.parse(file.buffer, { columns: true }, function (err, rows) { var rows_1, rows_1_1; return __awaiter(_this, void 0, void 0, function () {
                    var row, res, id, dtos, currentSSN, currentHospitalId, currentMedicationId, currentNurseId, currentPractitionerId, patientDTO, nurseDTO, observationDTO, practitionerDTO, hospitalDTO, medicationDTO, patient, hospital, medication, practitioner, nurse, e_1_1;
                    var _this = this;
                    var e_1, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                // try {
                                if (err) {
                                    this.logger.error(err);
                                    return [2 /*return*/, err];
                                }
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 12, 13, 18]);
                                rows_1 = __asyncValues(rows);
                                _b.label = 2;
                            case 2: return [4 /*yield*/, rows_1.next()];
                            case 3:
                                if (!(rows_1_1 = _b.sent(), !rows_1_1.done)) return [3 /*break*/, 11];
                                row = rows_1_1.value;
                                res = getDtos_1.getDtos(row);
                                id = res.id, dtos = res.dtos;
                                currentSSN = id.currentSSN, currentHospitalId = id.currentHospitalId, currentMedicationId = id.currentMedicationId, currentNurseId = id.currentNurseId, currentPractitionerId = id.currentPractitionerId;
                                patientDTO = dtos.patientDTO, nurseDTO = dtos.nurseDTO, observationDTO = dtos.observationDTO, practitionerDTO = dtos.practitionerDTO, hospitalDTO = dtos.hospitalDTO, medicationDTO = dtos.medicationDTO;
                                return [4 /*yield*/, this.prisma.patient.findUnique({
                                        where: {
                                            patient_ssn: currentSSN
                                        }
                                    })];
                            case 4:
                                patient = _b.sent();
                                return [4 /*yield*/, this.prisma.hospital.findUnique({
                                        where: {
                                            hospital_id: currentHospitalId
                                        }
                                    })];
                            case 5:
                                hospital = _b.sent();
                                return [4 /*yield*/, this.prisma.medication.findUnique({
                                        where: {
                                            medication_id: currentMedicationId
                                        }
                                    })];
                            case 6:
                                medication = _b.sent();
                                return [4 /*yield*/, this.prisma.practitioner.findUnique({
                                        where: {
                                            practitioner_id: currentPractitionerId
                                        }
                                    })];
                            case 7:
                                practitioner = _b.sent();
                                return [4 /*yield*/, this.prisma.nurse.findUnique({
                                        where: {
                                            nurse_id: currentNurseId
                                        }
                                    })];
                            case 8:
                                nurse = _b.sent();
                                // insert data into the database
                                return [4 /*yield*/, this.prisma.$transaction(function (prisma) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!!patient) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, this.prisma.patient.create({
                                                            data: __assign({}, patientDTO)
                                                        })];
                                                case 1:
                                                    _a.sent();
                                                    _a.label = 2;
                                                case 2:
                                                    if (!!practitioner) return [3 /*break*/, 4];
                                                    return [4 /*yield*/, prisma.practitioner.create({
                                                            data: __assign({}, practitionerDTO)
                                                        })];
                                                case 3:
                                                    _a.sent();
                                                    _a.label = 4;
                                                case 4:
                                                    if (!!hospital) return [3 /*break*/, 6];
                                                    return [4 /*yield*/, prisma.hospital.create({
                                                            data: __assign({}, hospitalDTO)
                                                        })];
                                                case 5:
                                                    _a.sent();
                                                    _a.label = 6;
                                                case 6:
                                                    if (!!medication) return [3 /*break*/, 8];
                                                    return [4 /*yield*/, prisma.medication.create({
                                                            data: __assign({}, medicationDTO)
                                                        })];
                                                case 7:
                                                    _a.sent();
                                                    _a.label = 8;
                                                case 8:
                                                    if (!!nurse) return [3 /*break*/, 10];
                                                    return [4 /*yield*/, prisma.nurse.create({
                                                            data: __assign({}, nurseDTO)
                                                        })];
                                                case 9:
                                                    _a.sent();
                                                    _a.label = 10;
                                                case 10: return [4 /*yield*/, prisma.observation.create({
                                                        data: __assign({}, observationDTO)
                                                    })];
                                                case 11:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                            case 9:
                                // insert data into the database
                                _b.sent();
                                _b.label = 10;
                            case 10: return [3 /*break*/, 2];
                            case 11: return [3 /*break*/, 18];
                            case 12:
                                e_1_1 = _b.sent();
                                e_1 = { error: e_1_1 };
                                return [3 /*break*/, 18];
                            case 13:
                                _b.trys.push([13, , 16, 17]);
                                if (!(rows_1_1 && !rows_1_1.done && (_a = rows_1["return"]))) return [3 /*break*/, 15];
                                return [4 /*yield*/, _a.call(rows_1)];
                            case 14:
                                _b.sent();
                                _b.label = 15;
                            case 15: return [3 /*break*/, 17];
                            case 16:
                                if (e_1) throw e_1.error;
                                return [7 /*endfinally*/];
                            case 17: return [7 /*endfinally*/];
                            case 18: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    var PatientsService_1;
    PatientsService = PatientsService_1 = __decorate([
        common_1.Injectable(),
        __param(1, common_1.Inject(prisma_config_1["default"].KEY))
    ], PatientsService);
    return PatientsService;
}());
exports.PatientsService = PatientsService;
