<?php

namespace App\Http\Controllers;

use App\Repositories\ReportRepositoryInterface;
use Illuminate\Http\JsonResponse;

class ReportController extends Controller
{
    public function __construct(private ReportRepositoryInterface $reportRepository) {}

    public function show(): JsonResponse
    {
        $data = $this->reportRepository->generate();
        return response()->json($data, 200);
    }
}
