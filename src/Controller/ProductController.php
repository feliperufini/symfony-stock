<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Product;

/**
 * @Route("/api", name="api_")
 */

class ProductController extends AbstractController
{
    public function __construct(ManagerRegistry $doctrine)
    {
        $this->EM = $doctrine->getManager();
    }

    /**
     * @Route("/product", name="product_index", methods={"GET"})
     */
    public function index(): JsonResponse
    {
        $data = $this->EM->createQuery('SELECT product.id, product.name, product.description, product.price, product.amount FROM App\Entity\Product product')->getResult();

        $response = new JsonResponse($data);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Headers', 'Authorization');
        return $response;
    }

    /**
     * @Route("/product", name="product_new", methods={"POST"})
     */
    public function new(Request $request): JsonResponse
    {
        $product = new Product();
        $product->setName($request->request->get('name'));
        $product->setDescription($request->request->get('description'));
        $product->setPrice($request->request->get('price'));
        $product->setAmount($request->request->get('amount'));

        $this->EM->persist($product);
        $this->EM->flush();

        return $this->json('Created new product successfully with id ' . $product->getId(), 200);
    }

    /**
     * @Route("/product/{id}", name="product_show", methods={"GET"})
     */
    public function show(int $id): JsonResponse
    {
        $product = $this->EM->getRepository(Product::class)->find($id);

        if (!$product) {
            return $this->json('No product found for id' . $id, 404);
        }

        $data =  [
            'id' => $product->getId(),
            'name' => $product->getName(),
            'description' => $product->getDescription(),
            'price' => $product->getPrice(),
            'amount' => $product->getAmount(),
        ];

        return $this->json($data, 200);
    }

    /**
     * @Route("/product/{id}", name="product_edit", methods={"PUT", "PATCH"})
     */
    public function edit(Request $request, int $id): JsonResponse
    {
        $product = $this->EM->getRepository(Product::class)->find($id);

        if (!$product) {
            return $this->json('No product found for id' . $id, 404);
        }

        $content = json_decode($request->getContent());
        $product->setName($content->name);
        $product->setDescription($content->description);
        $product->setPrice($content->price);
        $product->setAmount($content->amount);
        $this->EM->flush();

        $data =  [
            'id' => $product->getId(),
            'name' => $product->getName(),
            'description' => $product->getDescription(),
            'price' => $product->getPrice(),
            'amount' => $product->getAmount(),
        ];

        return $this->json($data, 200);
    }

    /**
     * @Route("/product/{id}", name="product_delete", methods={"DELETE"})
     */
    public function delete(int $id): JsonResponse
    {
        $product = $this->EM->getRepository(Product::class)->find($id);

        if (!$product) {
            return $this->json('No product found for id' . $id, 404);
        }

        $this->EM->remove($product);
        $this->EM->flush();

        return $this->json('Deleted a product successfully with id ' . $id, 200);
    }
}
