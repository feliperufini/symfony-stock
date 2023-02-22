<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Category;

/**
 * @Route("/api", name="api_")
 */

class CategoryController extends AbstractController
{
    public function __construct(ManagerRegistry $doctrine)
    {
        $this->EM = $doctrine->getManager();
    }

    /**
     * @Route("/category", name="category_index", methods={"GET"})
     */
    public function index(): JsonResponse
    {
        $data = $this->EM->createQuery('SELECT category.id, category.name FROM App\Entity\Category category')->getResult();

        return $this->json($data, 200);
    }

    /**
     * @Route("/category", name="category_new", methods={"POST"})
     */
    public function new(Request $request): JsonResponse
    {
        $category = new Category();
        $category->setName($request->request->get('name'));

        $this->EM->persist($category);
        $this->EM->flush();

        return $this->json('Created new category successfully with id ' . $category->getId(), 200);
    }

    /**
     * @Route("/category/{id}", name="category_edit", methods={"PUT", "PATCH"})
     */
    public function edit(Request $request, int $id): JsonResponse
    {
        $category = $this->EM->getRepository(Category::class)->find($id);

        if (!$category) {
            return $this->json('No category found for id' . $id, 404);
        }

        $content = json_decode($request->getContent());
        $category->setName($content->name);
        $this->EM->flush();

        $data =  [
            'id' => $category->getId(),
            'name' => $category->getName(),
        ];

        return $this->json($data, 200);
    }

    /**
     * @Route("/category/{id}", name="category_delete", methods={"DELETE"})
     */
    public function delete(int $id): JsonResponse
    {
        $category = $this->EM->getRepository(Category::class)->find($id);

        if (!$category) {
            return $this->json('No category found for id' . $id, 404);
        }

        $this->EM->remove($category);
        $this->EM->flush();

        return $this->json('Deleted a category successfully with id ' . $id, 200);
    }
}
